const jwt = require('jsonwebtoken');
const redisClient = require('redis').createClient();

redisClient.on('connect', function (err) {
  if (err) {
    console.log('Issue with redis connection');
  }
  else {
    console.log('Successfully connected with Redis');
  }
});

function _verifyCredentials(credentials) {
  const validUserEmail = "sanish@redis.com";
  const validPassword = "sanish";
  if (credentials.email === validUserEmail && credentials.password === validPassword) {
    return true;
  } else {
    return false;
  }
}
function _verifyRefreshToken(credentials) {
  return !!redisClient.exists(credentials['refresh_token']);
}
function verifyAccessToken(req, res, next) {
  const authorization = req.get('Authorization');
  let accessToken = authorization.split(' ').pop();
  redisClient.exists(accessToken, function (err, res) {
    if (err) {
      next({ status: 500, message: 'Issue with server'});
    } else {
      if (res) {
        next();
      } else {
        next({ status: 401, message: 'Who\'s token did you steal!!!'})
      }
    }
  })
}
function _verifyGrantType(credentials) {
  if (Object.keys(credentials).includes('grant_type')) {
    if (credentials['grant_type'] === 'password') {
      return _verifyCredentials;
    } else if (credentials['grant_type'] === 'refresh_token') {
      return _verifyRefreshToken;
    } else {
      return { 'grant_type': 'unknown' }
    }
  } else {
    return { 'grant_type': 'unknown' }
  }
}

function getAuthentication(credentials) {
  let verifyAuthenticity = _verifyGrantType(credentials);
  if (typeof verifyAuthenticity === "function") {
    if (verifyAuthenticity(credentials)) {
      const expiresIn = 30;
      let options = { expiresIn }
      let payload = {
        "token-id": Math.random(),
        "token-date": new Date()
      }
      let token = jwt.sign(payload, 'secret_key');
      redisClient.set(token, credentials.email, 'EX', expiresIn ,function (err, reply) {
        console.log(reply, err);
      });
      return {
        authenticated: true,
        token_type: "bearer",
        access_token: token,
        expires_in: expiresIn
      };
    } else {
      return {
        authenticated: false,
        message: 'Who are you?'
      };
    }
  } else {
    return {
      authenticated: false,
      message: 'Who are you?'
    };
  }
}

// function verifyToken(req, res, next) {
//   const authToken = req.get('Authorization');
//   if (typeof authToken === 'string') {
//     if (redisClient.exists(authToken)) {
//       next();
//     } else {
//       res.send({ message: 'Who \'s token did you steal'});
//     }
//   }
// }

module.exports = { getAuthentication, verifyAccessToken }
