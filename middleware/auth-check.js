const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/configJWT');

module.exports = (req, res, next) => {

  if (req.url === '/users' || req.url === '/movies') 
    return next();
  
  if (!req.headers.authorization) {
    return res
      .status(401)
      .end();
  }

  const token = req
    .headers
    .authorization
    .split(' ')[1];

 
  return jwt.verify(token, "velika_velika_tajna", (err, decoded) => {
   
    if (err) {
      return res
        .status(401)
        .end();
    }

    const userId = decoded.sub;

    // check if a user exists
    return User.findById(userId, (userErr, user) => {
      if (userErr || !user) {
        return res
          .status(401)
          .end();
      }

      return next();
    });
  });
};