const users = require("../users/users-model")

module.exports = {
    validateRegisterRequest,
    validateLoginRequest,
    checkIfUsernameExists,
}

function validateRegisterRequest(req, res, next){

    if (!req.body.email){
       res.status(400).json({ message: `Email is required` })
    } else if (!req.body.name){
       res.status(400).json({ message: `Name is required` })
    } else if (!req.body.username){
       res.status(400).json({ message: `Username is reqired` })
    } else if (!req.body.password){
        res.status(400).json({ message: `Password is reqired` })
    } else {
       next()
    }

}

function validateLoginRequest(req, res, next){
    
    if (!req.body.username){
       res.status(400).json({ message: `Username is reqired` })
    } else if (!req.body.password){
        res.status(400).json({ message: `Password is reqired` })
    } else {
       next()
    }

}

async function checkIfUsernameExists(req, res, next) {

   try {
      const user = await users.findBy({ username: req.body.username })
      if (user) {
         res.status(400).json({ message: `Username ${req.body.username} has been taken. Please try another username`})
      } else {
         next()
      }
   }
   catch (err){
      console.log(err)
   }
}



