var express = require('express');
var router = express.Router();
var User = require('../models/User');
var app = require('../app');
var cors = require('cors');
app.use(cors());

//CREATE
/**
 * @api {post} /user/add Request Post add
 * @apiName NewUser
 * @apiGroup User
 *
 * @apiParam (Request body) {String} username
 * @apiParam (Request body) {String} firstname
 * @apiParam (Request body) {String} lastname
 * @apiParam (Request body) {String} email
 * @apiParam (Request body) {String[]} role
 * @apiParam (Request body) {String} password
 * 
 *
 * @apiSampleRequest http://localhost:8080/user/add
 */
app.post('/user/add', async function(req, res, next) {
  const username = req.body.username;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  var password = req.body.password;
  var role = req.body.role;

  if(typeof role == "string"){
    role = role.replace(/\s/g,'');
    role = role.split(',');
  }

  User.create({ 
    username: username,
    password: password,
    email: email,
    role: role,
    lastname: lastname,
    firstname: firstname
  }).then(response =>{
    res.json(200);
  }).catch(function (e) {
    console.log(e);
    res.json(500);
  });
});

//READ
app.post('/user/all', function(req, res, next) {
  User.findAll().then(users => {
    res.json(users);
  }).catch(function (e) {
    console.log(e);
    res.json(500);
  });
}) 
app.get('/user/:id', function(req, res, next) {
  const id = req.params.id;
  User.findByPk(id).then(user =>{
      res.json(user);
  }).catch(function (e) {
      console.log(e);
      res.json(500);
    });  
});

//UPDATE
app.put('/user/:id', function(req, res, next) {
  const id = req.params.id;
  const username = req.body.username;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;

  res.json('OK!!');
});

//DELETE
app.delete('/user/:id', function(req, res, next) {
  const id = req.params.id;

  res.json('OK!!');
});

module.exports = router;
