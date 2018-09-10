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
        User.findOne({
            username: req.body.username
        }, function(err, user) {
            if (err) {
                return res.status(500).json({err: err});
            } else if (!user) {
                return res.status(200).json({ success: false, err: "User not found"});
            } else if (user) {
                // hash request password to see if matches db password
                const encrypted = saltHashPassword(req.body.password, user.password.salt);
                if (user.password.hash !== encrypted.hash || user.password.salt !== encrypted.salt) {
                    return res.status(200).json({ success: false, err: "Incorrect password"});
                } else {
                    // happy path, return user with new token
                    const token = jwt.sign(JSON.stringify(user), config.secret);

                    // return the information including token as JSON
                    return res.status(200).json({
                        success: true,
                        token: token
                    });
                }
            }

        });
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
                       return res.status(200).json({success: true, user: user});
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