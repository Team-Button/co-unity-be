const jwt = require("jsonwebtoken");
const {
  jwtSecret
} = require("../api/auth/auth-config");

//this restricted middleware will decode id and name for future use within the application

module.exports = (req, res, next) => {
  const {
    authorization
  } = req.headers;

  if (authorization) {
    jwt.verify(authorization, jwtSecret, function (err, decodedToken) {
      console.log(authorization);
      if (err) {
        res.status(401).json({
          message: "Token is Invalid"
        });
      } else {
        req.user = {
          id: decodedToken.id,
          name: decodedToken.name,
        };
        next();
      }
    });
  } else {
    res.status(400).json({
      message: "Login and try again"
    });
  }
};