const express = require('express');
const Employee = require('../models/employee');

const router = express.Router();

router.get("", (req, res, next) => {
    Employee.find().then(result => {
        res.status(200).json({
            rc: '0',
            empList: result
        });
    }).catch(err => {
        res.status(200).json({
            rc: '2',
            message: "Sorry something went wrong"
        })
    })
});

router.post("/action", (req, res, next) => {
    console.log(req.body);
    if (req.body.action === 'add') {
        const empData = new Employee({
            empId: req.body.empId,
            name: req.body.name,
            domain: req.body.domain,
            designation: req.body.designation,
            role: req.body.role
        });
        empData.save().then(result => {
            res.status(200).json({
                rc: '0',
                message: "Added successfully"
            });
        }).catch(err => {
            res.status(200).json({
                rc: '2',
                message: "Sorry something went wrong"
            })
        });
    }
    else if(req.body.action === 'delete'){
        Employee.deleteOne({_id: req.body.id}).then(result => {
            if(result.n > 0){
                res.status(200).json({
                    rc: '0',
                    message: 'Deleted successfully'
                });
            }
            else{
                res.status(200).json({
                    rc: '2',
                    message: "Unable to delete"
                }); 
            }
        }).catch(err => {
            res.status(200).json({
                rc: '2',
                message: "Sorry something went wrong"
            });
        });
    }
    else if(req.body.action === 'edit'){
        const empData = new Employee({
            empId: req.body.empId,
            name: req.body.name,
            domain: req.body.domain,
            designation: req.body.designation,
            role: req.body.role,
            _id: req.body.id
        });
        Employee.updateOne({_id: req.body.id}, empData).then(result => {
            if(result.nModified > 0){
                res.status(200).json({
                    rc: '0',
                    message: 'Modified successfully'
                });
            }
            else{
                res.status(200).json({
                    rc: '2',
                    message: "No modified details found"
                });
            }
        }).catch(err => {
            res.status(200).json({
                rc: '2',
                message: "Sorry something went wrong"
            });
        });
    }
    else{
        res.status(200).json({
            rc: '2',
            message: "Invalid action"
        })
    }
});

module.exports = router;