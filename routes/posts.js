var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var app = require('../app');
var Post = require('../models/Post');
var cors = require('cors');
const User = require('../models/User');
app.use(cors());


//CREATE
/**
 * @api {post} /post/add Request Post add
 * @apiName NewPost
 * @apiGroup Post
 *
 * @apiParam {Number} author
 * @apiParam {String} location
 * @apiParam {String} content
 *
 * @apiSuccess {String} string
 * @apiSampleRequest http://localhost:8080/post/add
 */
app.post('/post/add', function(req, res, next) {
    const author = req.body.author;
    const content = req.body.content;
    const location = req.body.location;
    Post.create(
    { 
        author: author, 
        content: content,
        location: location 
    }).then(response => {
        res.json(200);
    }).catch(function (e) {
        console.log(e);
        res.json(500);
    });
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

/**
 * @api {get} /post/:id Request Post get
 * @apiName GetPost
 * @apiGroup Post
 *
 * @apiParam {Number} id Post unique ID.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *      "id": 1,
 *      "content": "La vie est belle",
 *      "location": "Paris",
 *      "createdAt": "2020-07-26T14:33:46.304Z",
 *      "updatedAt": "2020-07-26T14:33:46.304Z",
 *      "author": 2
 *     }
 *
 * @apiSampleRequest http://localhost:8080/post/:id
 * @apiSuccess {Object}  post
 */
app.get('/post/:id', function(req, res, next) {
    const id = req.params.id;
    Post.findByPk(id).then(post =>{
        if(post !== null){
            User.findByPk(post.author).then(user =>{
                res.json({post:post, author:user});
            }).catch(function (e) {
                console.log(e);
                res.json(500);
            });  
        }else{
            res.json(post);
        }
    }).catch(function (e) {
        console.log(e);
        res.json(500);
    });  
});

//UPDATE
app.put('/post/:id', function(req, res, next) {
    const id = req.params.id;
    const content = req.body.content;
    Post.findByPk(id).then(post =>{
        post.update({
            content: content
        }, {}).then(response =>{
            res.json(200);
        }).catch(function (e) {
            console.log(e);
            res.json(500);
          })
    }).catch(function (e) {
        console.log(e);
        res.json(500);
    });  
    
});

//DELETE
/**
 * @api {DELETE} /post/:id Request Post delete
 * @apiSampleRequest http://localhost:8080/post/:id
 * 
 * @apiName DeletePost
 * @apiGroup Post
 *
 * @apiParam {Number} id Post unique ID.
 *
 */
app.delete('/post/:id', function(req, res, next) {
    const id = req.params.id;
    Post.findByPk(id).then(post =>{
        if(post === null){
            res.json(404);
        }else{
        post.destroy().then(response =>{
            res.json(200);
        }).catch(function (e) {
            console.log(e);
            res.json(500);
            })
        }
    }).catch(function (e) {
        console.log(e);
        res.json(500);
    });  
});

module.exports = router;
