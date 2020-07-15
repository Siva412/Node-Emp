const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user');
const routes = express.Router();


routes.post('/signup', (req, res, next) => {
    if (req.body.name && req.body.email && req.body.password) {
        bcrypt.hash(req.body.password, 10).then(hash => {
            const user = new User({
                "name": req.body.name,
                "email": req.body.email,
                "password": hash
            });
            user.save().then(() => {
                res.status(200).json({
                    rc: '0',
                    message: "Successfully Registered"
                });
            }).catch(err => {
                res.status(200).json({
                    rc: '2',
                    message: "Sorry something went wrong"
                });
            })
        })
    }
    else {
        res.status(200).json({
            rc: '1',
            message: "Invalid Data"
        });
    }
});

routes.post('/login', (req, res, next) => {
    let userData;
    if(req.body.email && req.body.password){
        User.findOne({email: req.body.email}).then(response => {
            if(!response){
                return res.status(200).json({
                    rc: '1',
                    message: 'Email not found'
                });
            }
            userData = response;
            return bcrypt.compare(req.body.password, userData.password)
        }).then(data => {
            if(!data){
                return res.status(200).json({
                    rc: '1',
                    message: 'Auth failed'
                });
            }
            res.status(200).json({
                rc: '0',
                message: "Authenticated successfully"
            });
        }).catch(err => {
            return res.status(200).json({
                rc: '1',
                message: 'Something went wrong'
            });
        })
    }
    else{
        res.status(200).json({
            rc: '1',
            message: 'Invalid Data'
        });
    }
});

module.exports = routes;