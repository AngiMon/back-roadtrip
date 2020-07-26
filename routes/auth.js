var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var app = require('../app');
var cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');
app.use(cors());


/**
 * @api {post} /auth/token-delivery Token delivery
 * @apiName TokenDelivery
 * @apiGroup Auth
 *
 * @apiParam {String} email
 * @apiParam {String} password
 *
 * @apiSampleRequest http://localhost:8080/auth/token-delivery
 */
app.post('/auth/token-delivery', function(req, res, next) {
    User.findOne({ where:{email: req.body.email} }).then(
        (user) => {
            if (!user) {
                return res.status(401).json({
                    error: new Error('User not found!')
                });
            }
            bcrypt.compare(req.body.password, user.password).then(
                (valid) => {
                if (!valid) {
                    return res.status(401).json({
                    error: new Error('Incorrect password!')
                    });
                }
                console.log(process.env.secret);

                const token = jwt.sign(
                {
                    userId: user.id,
                    userEmail: user.email
                },
                process.env.secret,
                { expiresIn: '1h' });

                res.status(200).json({
                    token: token
                });
            }).catch(
                (error) => {
                    res.status(500).json({
                        error: error
                    });
                }
            );
        }).catch(
        (error) => {
            console.log(error);

          res.status(500).json({
            error: error
          });
        }
    );
})