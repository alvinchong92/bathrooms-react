const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const authRouter = require('./routes/authRouter');
const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');
const authentication = require('./middleware/authentication');
const session = require('express-session');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(session({
  secret: process.env.SESSION_SECRET,
  cookie: {},
  resave: true,
  saveUninitialized: true,
}));

app.use(morgan('dev'));

app.use('/api', authentication);
app.use('/api', authRouter);
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);


module.exports = app;

