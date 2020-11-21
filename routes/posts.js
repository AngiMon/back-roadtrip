var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var app = require('../app');
var Post = require('../models/Post');
var cors = require('cors');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const TokenService = require("../services/TokenService")
app.use(cors());


//CREATE
/**
 * @api {post} /post/add Request Post add
 * @apiName NewPost
 * @apiGroup Post
 * @apiHeader Authorization Basic Access Authentication token.
 *
 * @apiParam {String} location
 * @apiParam {String} title
 * @apiParam {String} content
 * @apiParam {Boolean} published
 *
 * @apiSuccess {String} string
 * @apiSampleRequest http://localhost:8080/post/add
 */
app.post('/post/add', async function(req, res, next) {
    const { title, content, location, published } = req.body;

    try {
        //headers
        const token = req.headers.authorization;
        const tokenInfo = TokenService.tokenVerify(token);

        if (tokenInfo.status != 200){
            res.status(200).json(tokenInfo);
        } else{
            const decodedToken = jwt.verify(token, process.env.secret);
            const author = decodedToken.userId;
            
            const response = await Post.create({ 
                title: title,
                author: author, 
                content: content,
                location: location,
                published: published
            })
            
            if (!response) throw new Error('Failed to create post in database')
                
            res.json(200)
        } 
    } catch (err) {
        console.error(err)
        res.status(401).json({error: new Error('Invalid request!')})
    }; 
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
app.get('/post/all', async function(req, res, next) {
    //headers
    const token = req.headers.authorization;
    var tokenInfo = TokenService.tokenVerify(token);

    if(tokenInfo.status != 200){
        res.status(200).json(tokenInfo);
    }else{
        try{
            const posts = await Post.findAll({order:[["id", "DESC"]], include:[{ model: User }]});

            if(!posts) throw new Error('Failed to retrive posts from the database');

            res.json(posts);
        } catch(err){
            console.error(err)
            res.status(401).json({error: new Error('Invalid request!')})
        }
    }
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
app.get('/post/:id', async function(req, res, next) {
    const id = req.params.id;

    try{
        const post = await Post.findByPk(id)
        
        if(!post) throw new Error('Failed to find post in database');
        
        const user = await User.findByPk(post.author);
        
        if(!user) throw new Error('Failed to find post author in database');
        
        res.json({post:post, author:user});
    } catch (err) {
        console.error(err)
        res.status(401).json({error: new Error('Invalid request!')})
    }; 
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
app.put('/post/:id', async function(req, res, next) {
    const id = req.params.id;
    const {content} = req.body;
    //headers
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.secret);
    const userId = decodedToken.author;

    try {
        const post = await Post.findByPk(id);

        if (!post) throw new Error('Failed to find post in database');

        const response = await post.update({content: content});

        if (!response) throw new Error('Failed to update post in database')

        res.json(200);
            
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
app.delete('/post/:id', async function(req, res, next) {
    const id = req.params.id;
    //headers
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, process.env.secret);
    const userId = decodedToken.author;

    try {
        const response = await Post.findByPk(id);
     
        if (!response) throw new Error('Failed to delete post in database');
                    
        res.json(200);
    }catch (err) {
        console.error(err)
        res.status(401).json({error: new Error('Invalid request!')})
    };
});

module.exports = router;
