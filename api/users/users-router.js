const router = require("express").Router();
const restrictedMiddleware = require("../../middlewares/restricted-middleware")
const Users = require("./users-model.js");

router.get("/", restrictedMiddleware, (req, res) => {
  
  Users.returnUserInfo(req.user.id)
    .then((user) => {
      console.log(user)
      const returnValue = {
        id: user.id,
        name: user.name,
        token: req.headers.authorization,
        message: `Welcome ${user.username}`
      }
      res.json(returnValue)
    .catch((err) => res.send(err));
    })
    
});

module.exports = router;