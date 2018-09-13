// requires
const express = require("express");
const router = express.Router();
const Visit = require("../models/visit");
const validator = require("../utilities/validator");
const jwt = require('jsonwebtoken');
const config = require('../config');

// get all visits that a user has created for themselves
router.post('/get', function(req, res) {
    const required = [
        'token'
    ];
    if (validator.validateBody(req.body, required)) {
        // get the user's id from the jwt
        jwt.verify(req.body.token, config.secret, function (err, decoded) {
            if (err) {
                return res.status(200).json({success: false, err: err});
            } else {
                // find the visits given the users id, populate the doctor attribute
                Visit.find({user: decoded._id}).populate("doctor").exec().then(function (vis) {
                    return res.status(200).json({success: true, visits: vis});
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
// create a visit. notice that the users id is required, not a token
router.post('/create', function(req, res) {
    const required = [
        "user",
        "procedures",
        "doctor",
        "date",
        "location"
    ];
    if (validator.validateBody(req.body, required)) {
        const visitObj = {};
        required.map((field) => {
            visitObj[field] = req.body[field];
        });
        const newVisit = new Visit(visitObj);
        newVisit.save(function(err, newVisit) {
            if (err) {
                return res.status(400).json({success: false, err: err});
            } else {
                // after we save it, populate the doctor field in it and return it
                Visit.findOne({_id: newVisit._id}).populate("doctor").exec().then(function(newVisit) {
                    return res.status(200).json({success: true, visit: newVisit});
                })
                .catch(function(err) {
                    return res.status(200).json({success: false, err: err});
                });
            }
        });
    } else {
        return res.status(200).json({success: false, err: "Fields required"});
    }
});
// delete a visit given the visit identifier
router.post('/delete', function(req, res) {
    const required = [
        "visit_id"
    ];
    if (validator.validateBody(req.body, required)) {
        // make sure that the visit exists
        Visit.findOne({_id: req.body.visit_id}, function(err) {
            if (err) {
                return res.status(400).json({success: false, err: err});
            } else {
                // remove the visit
                Visit.remove({_id: req.body.visit_id}, function(err) {
                    if (err) {
                        return res.status(400).json({success: false, err: err});
                    } else {
                        return res.status(200).json({success: true});
                    }
                });
            }
        });
    } else {
        return res.status(400).json({success: false, err: "Missing visit_id"});
    }
});

module.exports = router;