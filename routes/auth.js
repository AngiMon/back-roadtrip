var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var app = require('../app');
var cors = require('cors');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const TokenService = require("../services/TokenService")
var cookieParser = require('cookie-parser');

app.use(cors());
app.use(cookieParser());


/**
 * @api {post} /auth/token-delivery Anonymous token delivery
 * @apiName TokenDeliveryForAnonymous
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
/**
 * @api {post} /auth/account/token-delivery Dashboard token delivery
 * @apiName TokenDeliveryForDashboard
 * @apiGroup Auth
 *
 * @apiParam {String} email
 * @apiParam {String} password
 *
 * @apiSampleRequest http://localhost:8080/auth/account/token-delivery
 */
app.post('/auth/account/token-delivery', function(req, res, next) {
    const {email, password} = req.body;

    User.findOne({ where:{email: email} }).then(
        (user) => {
            if (!user) {
                return res.status(401).json({
                    error: new Error('User not found!')
                });
            }
            bcrypt.compare(password, user.password).then(
                (valid) => {
                if (!valid) {
                    return res.status(401).json({
                    error: new Error('Incorrect password!')
                    });
                }

                const token = jwt.sign(
                {
                    userId: user.id,
                    userEmail: user.email,
                    role: "dashboard"
                },
                process.env.secret,
                { expiresIn: '3h' });

                res.status(200).json({
                    token: token,
                    user: user
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
/**
 * @api {post} /auth/token-verify Token verify
 * @apiName TokenVerify
 * @apiGroup Auth
 *
 * @apiParam {String} token
 *
 * @apiSampleRequest http://localhost:8080/token-verify
 */
app.post('/token-verify', function(req, res, next){
    const token = req.body.token;
    const tokenInfo = TokenService.tokenVerify(token);
    res.status(200).json(tokenInfo);
})

module.exports = router;