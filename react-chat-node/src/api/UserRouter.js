const express = require('express');
const { verifyAccessToken } = require('../service/auth-service');
const UserRouter = express.Router();

UserRouter.get('/me', verifyAccessToken, function (req, res) {
  res.status(200).send({ 'user_id': 1 });
})

module.exports = UserRouter;
