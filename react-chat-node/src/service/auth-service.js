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

module.exports = {
  getAuthentication : function(credentials) {
    const validUsername = "Sanish";
    const validPassword = "Sanish";
    if (credentials.username === validUsername && credentials.password === validPassword) {
      const expiresIn = 20;
      let options = { expiresIn }
      let token = jwt.sign(credentials, 'secret_key');
      console.log('this is token', token);
      redisClient.set(credentials.username, token, function (err, reply) {
        console.log(reply, err);
      });
      return {
        token_type: "bearer",
         access_token: token,
         expires_in: expiresIn
      };
    } else {
       return { message: 'Who are you?' };
    }
  }
}
