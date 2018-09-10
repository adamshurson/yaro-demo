// require router
const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctor");

router.get('/get', function(req, res) {
    Doctor.find({}, function(err, docs) {
        if (err) {
            return res.status(500).json({success: false, err: err});
        } else {
            return res.status(200).json({success: true, doctors: docs});
        }
    });
});

module.exports = router;