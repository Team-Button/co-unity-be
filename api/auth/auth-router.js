const router = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { jwtSecret } = require("./auth-config");

const Users = require("../users/users-model");

const { 
  validateRegisterRequest, 
  checkIfUsernameExists, 
  validateLoginRequest } = require("../../middlewares/user-middleware")


//req.body will be validated by validateLoginRequest middleware to make sure people send in correct request
//after that, checkIfUsernameExits will validate whether the username has been taken

router.post("/register", validateRegisterRequest, checkIfUsernameExists, (req, res) => {

  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash;

  Users.add(user)
    .then((saved) => {
      res.status(201).json(saved);
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});


//req.body will be validated by validateLoginRequest middleware to make sure people send in correct request

router.post("/login", validateLoginRequest, (req, res) => {

  const { username, password } = req.body

  Users.findBy({ username })
    .first()
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = signToken(user);
        res.status(200).json({
          token, // adds token to res
          message: `Welcome ${user.username}!`,
          id: user.id,
        });
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch((error) => {
      res.status(500).json(error);
    });
});

// creates and signs the token
function signToken(user) {
  const payload = {
    name: user.name,
    id: user.id,
  };

  const options = {
    expiresIn: "2h",
  };

  return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;
