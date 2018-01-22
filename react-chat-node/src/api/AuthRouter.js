const express = require('express');
const AuthRouter = express.Router();
const { getAuthentication, verifyAccessToken } = require('../service/auth-service');

AuthRouter.post('/token', function (req, res, next) {
  let credentials = req.body;
  getAuthentication(credentials)
  .then(function (authentication) {
    res.send(authentication)
  }).catch(function (err) {
    next(err);
  });
});

module.exports = AuthRouter;
