var app = require('../app');



var usersRouter = require('./users');
var postsRouter = require('./posts');

app.use('/user/', usersRouter);
app.use('/post/', postsRouter);