const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const {getAuthentication} = require('./service/auth-service');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
})

app.post('/login', function (req, res) {
  let credentials = req.body;
  let authentication = getAuthentication(credentials);
  res.send(authentication);
})


app.listen(3000, function () {
  console.log('node server listening at 3000');
});
