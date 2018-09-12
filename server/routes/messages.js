const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../config');
const Message = require("../models/message");
const validator = require("../utilities/validator");

router.post('/get_sent', function(req, res) {
    const required = [
        'token'
    ];
    if (validator.validateBody(req.body, required)) {
        jwt.verify(req.body.token, config.secret, function(err, decoded) {
            Message.find({user: decoded._id, senderType: 'user'}).populate("doctor").populate('user').exec().then(function(messages) {
                return res.status(200).json({success: true, messages: messages});
            })
                .catch(function(err) {
                    return res.status(200).json({success: false, err: err});
                });
        });
    } else {
        return res.status(400).json({success: false, err: "Token required"});
    }
});
router.post('/get_received', function(req, res) {
    const required = [
        'token'
    ];
    if (validator.validateBody(req.body, required)) {
        jwt.verify(req.body.token, config.secret, function(err, decoded) {
            Message.find({user: decoded._id, senderType: 'doctor'}).populate("doctor").populate('user').exec().then(function(messages) {
                return res.status(200).json({success: true, messages: messages});
            })
                .catch(function(err) {
                    return res.status(200).json({success: false, err: err});
                });
        });
    } else {
        return res.status(400).json({success: false, err: "Token required"});
    }
});
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
        return res.status(400).json({success: false, err: "Token required"});
    }
});

module.exports = router;