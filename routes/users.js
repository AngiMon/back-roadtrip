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
  const  { username, firstname, lastname, email, password } = req.body;
  let { role } = req.body;

  if(typeof role == "string" && role.length > 0){
    role = role.replace(/\s/g,'');
    role = role.split(',');
  }

  try{
    const response = await User.create({ 
      username: username,
      password: password,
      email: email,
      role: role,
      lastname: lastname,
      firstname: firstname
    })
  
    if(!response) throw new Error('Failed to create user in database')
  
    res.json(200);
  } catch (err){
    console.log(err);
    res.json(401, 'Invalid request');
  }
 
});

//READ
app.post('/user/all', async function(req, res, next) {
  try{
    const users = await User.findAll();

    if(!users) throw new Error('Failed to retrive users in the database');
  
    res.json(users);
  } catch(err){
    console.log(err);
    res.json(401, 'invalid request');
  }
  
}) 
app.get('/user/:id', async function(req, res, next) {
  const id = req.params.id;

  try{
    const user = await User.findByPk(id);

    if(!user) throw new Error('Failed to find user in the database');

    res.json(user);
  } catch (err){
    console.log(err);
    res.json(401, 'Invalid request');
  }
});

//UPDATE
app.put('/user/:id', function(req, res, next) {
  const { username, firstname, lastname } = req.body;
  const id = req.params.id;

  //TODO update
  res.json('OK!!');
});

//DELETE
app.delete('/user/:id', function(req, res, next) {
  const id = req.params.id;

  //TODO delete
  res.json('OK!!');
});

module.exports = router;
