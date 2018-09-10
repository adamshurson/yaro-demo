// require router
const express = require("express");
const config = require('../config');
const router = express.Router();
const validator = require("../utilities/validator");
const User = require("../models/user");
const jwt = require('jsonwebtoken');
const crypto = require("crypto");

// login
router.post('/login', function(req, res) {
    const required = [
        "username",
        "password"
    ];
    if (validator.validateBody(req.body, required)) {
        login(req.body.username, req.body.password, res);
    } else {
        return res.status(400).json({success: false, err: "Username and Password required"});
    }
});
router.post('/register', function(req, res) {
    const required = [
        "username",
        "password",
        "first_name",
        "last_name",
        "address",
        "insurance",
        "birth_date"
    ];
    if (validator.validateBody(req.body, required)) {
        User.find({username: req.body.username}, function(err, users) {
            if (users.length === 0) {
                // initialize new user and fill out fields
                const newUser = {};
                required.map((field) => {
                    // skip password, handle that later
                    if (field !== "password") {
                        newUser[field] = req.body[field];
                    }
                });
                // encrypt password
                newUser.password = saltHashPassword(req.body.password);

                // create mongo object
                const user = new User(newUser);

                // save user
                user.save(function(err, user) {
                   if (err) {
                       return res.status(200).json({success: false, err: err});
                   } else {
                       login(user.username, user.password, res);
                   }
                });
            } else {
                return res.status(200).json({success: false, err: "User already exists"});
            }
        });
    } else {
        return res.status(200).json({success: false, err: "Please fill out all fields"});
    }
});

login = function(username, password, res) {
    User.findOne({
        username: username
    }, function(err, user) {
        if (err) {
            return res.status(500).json({success: false, err: err});
        } else if (!user) {
            return res.status(200).json({ success: false, err: "User not found"});
        } else if (user) {
            let comparison = null;

            // check if user is logging in or returning from registering
            if (password.salt) {
                comparison = password;
            } else {
                comparison = saltHashPassword(password, user.password.salt);
            }

            // compare hashes
            if (user.password.hash !== comparison.hash || user.password.salt !== comparison.salt) {
                return res.status(200).json({success: false, err: "Incorrect password"});
            } else {
                // remove sensitive info
                const userObject = JSON.stringify(user);
                delete userObject.password;

                // set new token
                const token = jwt.sign(JSON.stringify(userObject), config.secret);

                // return the information including token as JSON
                return res.status(200).json({
                    success: true,
                    userObject: userObject,
                    token: token
                });
            }
        }

    });
};
genRandomString = function(length) {
    return crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0,length);
};
sha512 = function(pw, salt) {
    const hash = crypto.createHmac('sha512', salt);
    hash.update(pw);
    const password = hash.digest('hex');
    return {
        hash: password,
        salt: salt
    };
};
saltHashPassword = function(pw, salt) {
    salt = salt || genRandomString(16);
    return sha512(pw, salt);
};

module.exports = router;