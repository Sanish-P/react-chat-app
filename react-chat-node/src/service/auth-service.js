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
  console.log('verify credentials');
  return new Promise(function (resolve, reject) {
    // fetch info from data base
    const validUserEmail = "sanish@redis.com";
    const validPassword = "sanish";
    const userId = 1;
    if (credentials.email === validUserEmail && credentials.password === validPassword) {
      resolve({
        verified: true,
        userId
      });
    } else {
      reject({ verified: false });
    }
  })
}

function _verifyRefreshToken(credentials) {
  console.log('refresh called');
  return new Promise(function (resolve, reject) {
    redisClient.exists(credentials['refresh_token'], function (err, resp) {
      if (err) {
        console.log('err');
        reject({ verified: false });
      } else {
        console.log('alright');
        if (resp) {
          resolve({ userId: 1 })
        } else {
          reject({ verified: false });
        }
      }
    })
  })
}

function verifyAccessToken(req, res, next) {
  const authorization = req.get('Authorization');
  (typeof authorization !== 'string') && next({ status: 403, message: 'You don\'t belong here'})
  let accessToken = (typeof authorization === 'string') && authorization.split(' ').pop();
  redisClient.exists(accessToken, function (err, res) {
    if (err) {
      next({ status: 500, message: 'Issue with server'})
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

function setTokenInRedis(token, value, expiresIn) {
  return new Promise(function (resolve, reject) {
    redisClient.set(token, value, 'EX', expiresIn, function (err, reply) {
      if (err) {
        reject();
      } else {
        resolve();
      }
    })
  })
}

function getAuthentication(credentials) {
  let verifyAuthenticity = _verifyGrantType(credentials);
  if (typeof verifyAuthenticity === "function") {
    return new Promise(function (resolve, reject) {
      verifyAuthenticity(credentials).then(function (verifiedUser) {
          let expiresIn = 15;
          let options = { expiresIn }
          let payload = {
            "token-id": Math.random(),
            "token-date": new Date(),
            "user-id": verifiedUser['userId']
          }
          let access_token = jwt.sign(payload, 'access_secret_key');
          let refresh_token = jwt.sign(payload, 'refresh_secret_key');
          let setAccessToken = setTokenInRedis(access_token, verifiedUser['userId'], expiresIn);
          expiresIn = 60;
          let setRefreshToken = setTokenInRedis(refresh_token, verifiedUser['userId'], expiresIn);
          Promise.all([setAccessToken, setRefreshToken]).then(function () {
            resolve ({
              authenticated: true,
              token_type: "bearer",
              access_token,
              refresh_token,
              expires_in: expiresIn
            });
          }).catch(function () {
            reject();
          })
        });
    })
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
