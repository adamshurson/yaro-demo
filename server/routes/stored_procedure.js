// require router
const express = require("express");
const router = express.Router();
const validator = require("../utilities/validator");
const StoredProcedure = require("../models/stored_procedure");

router.post('/create', function(req, res) {
    const required = [
        "name",
        "description",
        "default_cost"
    ];
    if (validator.validateBody(req.body, required)) {
        const procedureObj = {};
        required.map((field) => {
            procedureObj[field] = req.body[field];
        });
        const newProcedure = new StoredProcedure(procedureObj);
        newProcedure.save(function(err, newProcedure) {
           if (err) {
               return res.status(500).json({err: err});
           } else {
               return res.status(200).json({success: true, procedure: newProcedure});
           }
        });
    } else {
        return res.status(400).json({success: false, err: "Username and Password required"});
    }
});
router.get('/get', function(req, res) {
    StoredProcedure.find({}, function(err, procedures) {
       if (err) {
           return res.status(500).json({err: err});
       } else {
           return res.status(200).json({success: true, procedures: procedures});
       }
    });
});

module.exports = router;