const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { getAuthentication, verifyAccessToken } = require('./service/auth-service');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
})

app.post('/auth/token', function (req, res) {
  let credentials = req.body;
  getAuthentication(credentials)
  .then(function (authentication) {
    console.log('Responding');
    res.send(authentication)
  })
})

app.get('/user/me', verifyAccessToken, function (req, res) {
  res.status(200).send({ 'user_id': 1 })
})

app.get('/super-secret-resource', verifyAccessToken, function (req, res) {
  res.status(200).send({ message: 'Welcome bro!!!'});
})

app.use(function (err, req, res, next) {
  if ((typeof err.status) === 'number') {
    res.status(err.status).send({ message: err.message });
  } else {
    console.log(err);
    res.status(500).send({ message: 'Server error'})
  }
})

app.listen(3000, function () {
  console.log('node server listening at 3000');
});
