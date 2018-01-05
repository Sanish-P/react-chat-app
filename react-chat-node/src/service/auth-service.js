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
      let payload = {
        "token-id": Math.random(),
        "token-date": new Date()
      }
      let token = jwt.sign(payload, 'secret_key');
      console.log('this is token', token);
      redisClient.set(token, credentials.username ,function (err, reply) {
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
