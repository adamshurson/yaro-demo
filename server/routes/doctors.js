// requires
const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctor");

// nothing special here, just returning a list of the 10 doctors stored in the DB
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