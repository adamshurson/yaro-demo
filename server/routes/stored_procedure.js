// requires
const express = require("express");
const router = express.Router();
const validator = require("../utilities/validator");
const StoredProcedure = require("../models/stored_procedure");

// create a stored procedure so we can use it later for visits
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
               return res.status(500).json({success: false, err: err});
           } else {
               return res.status(200).json({success: true, procedure: newProcedure});
           }
        });
    } else {
        return res.status(400).json({success: false, err: "Missing fields"});
    }
});
// get stored procedures, just returns a big 'ol list of em.
router.get('/get', function(req, res) {
    StoredProcedure.find({}, function(err, procedures) {
       if (err) {
           return res.status(500).json({success: false, err: err});
       } else {
           return res.status(200).json({success: true, procedures: procedures});
       }
    });
});
// delete a stored procedure. note that it does not remove stored procedures that have already been included in visits
router.post('/delete', function(req, res) {
    const required = [
        "procedure_id"
    ];
    if (validator.validateBody(req.body, required)) {
        // find a single stored procedure given an id
        StoredProcedure.findOne({_id: req.body.procedure_id}, function(err) {
            if (err) {
                return res.status(400).json({success: false, err: err});
            } else {
                // after making sure it exists, remove it from the db
                StoredProcedure.remove({_id: req.body.procedure_id}, function(err) {
                    if (err) {
                        return res.status(400).json({success: false, err: err});
                    } else {
                        return res.status(200).json({success: true});
                    }
                });
            }
        });
    } else {
        return res.status(400).json({success: false, err: "Missing procedure_id"});
    }
});
// edit a stored procedure.
router.post('/edit', function(req, res) {
    const required = [
        "procedure_id"
    ];
    if (validator.validateBody(req.body, required)) {
        StoredProcedure.findOne({_id: req.body.procedure_id}, function(err, proc) {
            if (err) {
                return res.status(400).json({success: false, err: err});
            } else {
                // can't map the required array, so we map all keys in the body of the request
                // this is because you don't have to submit the entire object, just the identifier
                // and what you want to change
                Object.keys(req.body).map((key) => {
                    proc[key] = req.body[key];
                });
                proc.save(function(err, proc) {
                    if (err) {
                        return res.status(500).json({success: false, err: err});
                    } else {
                        return res.status(200).json({success: true, procedure: proc});
                    }
                });
            }
        });
    } else {
        return res.status(400).json({success: false, err: "Missing procedure_id"});
    }
});

module.exports = router;