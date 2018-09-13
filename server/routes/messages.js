// requires
const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config');
const Message = require("../models/message");
const validator = require("../utilities/validator");

// get all messages that were sent from a user to a doctor
router.post('/get_sent', function(req, res) {
    const required = [
        'token'
    ];
    if (validator.validateBody(req.body, required)) {
        // get the users information from the token they sent
        jwt.verify(req.body.token, config.secret, function(err, decoded) {
            if (err) {
                return res.status(200).json({success: false, err: err});
            } else {
                // find all messages from the user with the decoded user _id, also populate the doctor and users information
                Message.find({user: decoded._id, senderType: 'user'}).populate("doctor").populate('user').exec()
                    .then(function(messages) {
                        return res.status(200).json({success: true, messages: messages});
                    })
                    .catch(function(err) {
                        return res.status(200).json({success: false, err: err});
                    });
            }
        });
    } else {
        return res.status(400).json({success: false, err: "Token required"});
    }
});
// get all messages that doctors have sent the user given the user token
router.post('/get_received', function(req, res) {
    const required = [
        'token'
    ];
    if (validator.validateBody(req.body, required)) {
        // decode the jwt and get the user's id
        jwt.verify(req.body.token, config.secret, function(err, decoded) {
            if (err) {
                return res.status(200).json({success: false, err: err});
            } else {
                // find messages with user id sent from doctors, populate the doctor and user attributes
                Message.find({user: decoded._id, senderType: 'doctor'}).populate("doctor").populate('user').exec()
                    .then(function (messages) {
                        return res.status(200).json({success: true, messages: messages});
                    })
                    .catch(function (err) {
                        return res.status(200).json({success: false, err: err});
                    });
            }
        });
    } else {
        return res.status(400).json({success: false, err: "Token required"});
    }
});
// create a message from the user, then create a test message back from the doctor
router.post('/create', function(req, res) {
    const required = [
        'user',
        'doctor',
        'senderType',
        'date',
        'content'
    ];
    if (validator.validateBody(req.body, required)) {
        const messageObj = {};
        required.map((field) => {
            messageObj[field] = req.body[field];
        });
        const newMessage = new Message(messageObj);
        newMessage.save(function(err) {
            if (err) {
                return res.status(200).json({success: false});
            } else {
                // here is our test message from the doctor back to the user
                messageObj.content = "Hi there, this is a test response to your message!";
                messageObj.senderType = 'doctor';
                const copyMessage = new Message(messageObj);
                copyMessage.save(function(err) {
                    if (err) {
                        return res.status(200).json({success: false});
                    } else {
                        return res.status(200).json({success: true});
                    }
                });
            }
        });
    } else {
        return res.status(400).json({success: false, err: "Fields required"});
    }
});

module.exports = router;