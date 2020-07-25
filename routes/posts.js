var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var app = require('../app');
var Post = require('../models/Post');

//CREATE
app.post('/post/add', async function(req, res, next) {
  const author = req.body.author;
  const content = req.body.content;
  const location = req.body.location;

  const newPost = await Post.create(
        { 
          author: author, 
          content: content,
          location: location 
        });

  res.json('Post added !');
});

//READ
app.get('/post/all', function(req, res, next) {
    Post.findAll().then(posts => {
        res.json(posts);
      }).catch(function (e) {
        console.log(e);
        res.json(500);
      });
});
app.get('/post/:id', function(req, res, next) {
    const id = req.params.id;
    Post.findByPk(id).then(post =>{
        res.json(post);
    }).catch(function (e) {
        console.log(e);
        res.json(500);
      });  
  });

//UPDATE
  app.put('/post/:id', function(req, res, next) {
    console.log(req.body);
    const id = req.params.id;
    const username = req.body.username;
  
    res.json('OK!!');
  });

//DELETE
app.delete('/post/:id', function(req, res, next) {
    console.log(req.body);
    const id = req.params.id;
  
    res.json('OK!!');
  });

  
module.exports = router;
