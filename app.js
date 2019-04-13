var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("./db");
const createerror = require('http-errors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var messagesRouter = require('./routes/messages');

// var Messages = require('./Models/Messages');
// var Users = require("./Models/Users");
var app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/messages', messagesRouter);

app.use((req, res, next) => {
    next(createerror(404));
})

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err);
})
// app.use('/messages', Messages);
// app.use('/Users', Users);

module.exports = app;
