// requires
const express = require("express");
const config = require('../config');
const router = express.Router();
const validator = require("../utilities/validator");
const User = require("../models/user");
const jwt = require('jsonwebtoken');
const crypto = require("crypto");

// authorizeToken: used for authenticating users when they refresh their browser session but have an active jwt
router.post('/authorizeToken', function(req, res) {
    const required = [
        "token"
    ];
    if (validator.validateBody(req.body, required)) {
        // if the jwt is still valid (i.e. hasn't expired yet) then return the user's information
        jwt.verify(req.body.token, config.secret, function(err, decoded) {
            if (err) {
                return res.status(200).json({success: false, err: err});
            } else {
                return res.status(200).json({success: true, userObject: decoded});
            }
        });
    } else {
        return res.status(400).json({success: false, err: "Token required"});
    }
});
// pretty vanilla login function, using recycled login function as it is shared with register's post-action
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
// register the user, login them in, and then return their new jwt
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
        // make sure user does not exist with the same username
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
// main login function
login = function(username, password, res) {
    // check if there is a user with the supplied username
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
                // user is logging in, make sure to transform the password to compare it to the one in the DB
                comparison = saltHashPassword(password, user.password.salt);
            }

            // compare hashes
            if (user.password.hash !== comparison.hash || user.password.salt !== comparison.salt) {
                return res.status(200).json({success: false, err: "Incorrect password"});
            } else {
                // remove sensitive info
                const userObject = user;
                userObject.password = null;

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
// generate random salt string of given length
genRandomString = function(length) {
    return crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0,length);
};
// one way hash function given a salt
sha512 = function(pw, salt) {
    const hash = crypto.createHmac('sha512', salt);
    hash.update(pw);
    const password = hash.digest('hex');
    return {
        hash: password,
        salt: salt
    };
};
// if salt is supplied, we are logging in and need to compare the given salt
// otherwise, we are registering and need to create a new salt
saltHashPassword = function(pw, salt) {
    salt = salt || genRandomString(16);
    return sha512(pw, salt);
};

module.exports = router;