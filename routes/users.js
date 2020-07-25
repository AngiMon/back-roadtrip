var express = require('express');
var router = express.Router();
var User = require('../models/User');
var app = require('../app');

//CREATE
app.post('/user/add', async function(req, res, next) {
  const username = req.body.username;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const email = req.body.email;
  const password = req.body.password;

  User.create({ 
    username: username,
    password: password,
    email: email,
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
    console.log(users);
    res.json(users);
  }).catch(function (e) {
    console.log(e);
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
  console.log(req.body);
  const id = req.params.id;
  const username = req.body.username;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;

  res.json('OK!!');
});

//DELETE
app.delete('/user/:id', function(req, res, next) {
  console.log(req.body);
  const id = req.params.id;

  res.json('OK!!');
});

module.exports = router;
