// require router
const express = require("express");
const router = express.Router();
const Visit = require("../models/visit");
const validator = require("../utilities/validator");

router.get('/get', function(req, res) {
    Visit.find({}).populate("doctor").exec().then(function(vis) {
        return res.status(200).json({success: true, visits: vis});
    })
    .catch(function(err) {
        return res.status(200).json({success: false, err: err});
    });
});

router.post('/create', function(req, res) {
    const required = [
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

router.post('/delete', function(req, res) {
    const required = [
        "visit_id"
    ];
    if (validator.validateBody(req.body, required)) {
        Visit.findOne({_id: req.body.visit_id}, function(err, vis) {
            if (err) {
                return res.status(400).json({success: false, err: err});
            } else {
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