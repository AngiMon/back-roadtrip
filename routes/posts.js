var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var app = require('../app');
var Post = require('../models/Post');
var cors = require('cors');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
app.use(cors());


//CREATE
/**
 * @api {post} /post/add Request Post add
 * @apiName NewPost
 * @apiGroup Post
 * @apiHeader Authorization Basic Access Authentication token.
 *
 * @apiParam {Number} author
 * @apiParam {String} location
 * @apiParam {String} title
 * @apiParam {String} content
 *
 * @apiSuccess {String} string
 * @apiSampleRequest http://localhost:8080/post/add
 */
app.post('/post/add', function(req, res, next) {
    const author = req.body.author;
    const title = req.body.title;
    const content = req.body.content;
    const location = req.body.location;
    //headers
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.secret);
    const userId = decodedToken.author;

    try {
        Post.create(
        { 
            title: title,
            author: author, 
            content: content,
            location: location 
        }).then(response => {
            res.json(200);
        }).catch(function (e) {
            console.log(e);
            res.json(500);
        });
    } catch {
        res.status(401).json({
        error: new Error('Invalid request!')
    })}; 
});

//READ
/**
 * @api {get} /post/all Request Post get all
 * @apiName GetAllPost
 * @apiGroup Post
 *
 * @apiSampleRequest http://localhost:8080/post/all
 * @apiSuccess {Object}  post
 */
app.get('/post/all', function(req, res, next) {
    Post.findAll({order: [["id", "DESC"]],
        include: [
          { model: User }
        ]}).then(posts => {
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
/**
 * @api {put} /post/:id Request Post update
 * @apiName UpdatePost
 * @apiGroup Post
 * @apiHeader Authorization Basic Access Authentication token.
 *
 * @apiParam {Number} id Post unique ID.
 * @apiParam {String} content Post content.
 * 
 * @apiSampleRequest http://localhost:8080/post/:id
 */
app.put('/post/:id', function(req, res, next) {
    const id = req.params.id;
    const content = req.body.content;
    //headers
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.secret);
    const userId = decodedToken.author;

    try {
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
    } catch {
            res.status(401).json({
            error: new Error('Invalid request!')
    })};   
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
     //headers
     const token = req.headers.authorization;
     const decodedToken = jwt.verify(token, process.env.secret);
     const userId = decodedToken.author;
 
     try {
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
     } catch {
             res.status(401).json({
             error: new Error('Invalid request!')
     })};   
});

module.exports = router;
