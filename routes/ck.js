var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty')
var app = require('../app');
var cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));

var multipartMiddleware = multipart({uploadDir: './uploads/images'});
app.post('/ck/uploads', multipartMiddleware, function(req, resp) {
  console.log(req.body, req.files);
  // don't forget to delete all req.files when done
});

module.exports = router;