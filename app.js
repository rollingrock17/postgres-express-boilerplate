const express = require('express');
const logger = require('morgan');
const userRouter = require('./routes/user');
const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/user', userRouter);

module.exports = app;
