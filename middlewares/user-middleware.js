const db = require("../database/dbconfig")
const { findBy } = require("../auth/auth-config")

module.exports = {
    validateRegisterRequest,
    validateLoginRequest,
    checkIfUsernameExists,
    checkIfAuthorizedUser,
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

   const user = await db.findBy(req.body.username)

   if (user) {
      res.status(400).josn({ message: `Username ${req.body.username} has been taken. Please try another username`})
   } else {
      next()
   }

}

function checkIfAuthorizedUser(req, res, next){

   if(req.user.post.reported_by === req.user.id){
     next();
   } else {
     res.status(403).json({ message: `This user id is not authorized to perform this action` })    
   }

}

