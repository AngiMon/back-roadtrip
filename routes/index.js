var app = require('../app');
var usersRouter = require('./users');
var postsRouter = require('./posts');
var authRouter = require('./auth');
var ckRouter = require('./ck');


app.use('/user/', usersRouter);
app.use('/post/', postsRouter);
app.use('/auth/', authRouter);
app.use('/ck/', ckRouter);