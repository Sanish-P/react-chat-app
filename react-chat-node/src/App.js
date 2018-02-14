const express = require('express');
const morgan = require('morgan');
const app = express();
const bodyParser = require('body-parser');
const { verifyAccessToken } = require('./service/auth-service');
const AuthRouter = require('./api/AuthRouter');
const UserRouter = require('./api/UserRouter');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(morgan('tiny'))

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
})

app.use('/auth', AuthRouter);
app.use('/user', UserRouter);

app.get('/super-secret-resource/:id', verifyAccessToken, function (req, res) {
  res.status(200).send({ message: 'Welcome bro!!!'});
})

app.use(function (err, req, res, next) {
  if ((typeof err.status) === 'number') {
    if (err.status === 500) {
      res.status(500).send({ error: 'Server error' });
    } else {
      res.status(err.status).send({ error: err.message });
    }
  } else {
    if (!err.verified) {
      switch (err.message) {
        case 'Invalid grant type':
          res.status(400).send({ error: 'unsupported_grant_type'});
        case 'Invalid request for grant':
          res.status(400).send({ error: 'invalid_request'});
        case 'Invalid Refresh token':
          res.status(400).send({ error: 'invalid_client'});
        case 'Invalid Credentials':
          res.status(400).send({ error: 'invalid_client'});
      }
    } else {
      res.status(500).send({ error: 'Server error'});
    }
  }
})

app.listen(3000, function () {
  console.log('node server listening at 3000');
});
