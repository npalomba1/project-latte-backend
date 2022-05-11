var express = require('express');
var router = express.Router();
const User = require('../models/User.models')
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const saltrounds = 10; 
require("dotenv/config"); 

const isLoggedIn = require("../middleware/isLoggedIn")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//POST signup
router.post('/signup', function(req, res, next) {
  //1. Make sure fields are filled in 
  if(!req.body.username || !req.body.password) {
    return res.json({message: "Please fill out both fields"})
  }
  //2. Make sure username isn't taken
  User.findOne({username: req.body.username})
  .then((foundUser)=> {
    if(foundUser){
      return res.json({message: "Username is taken"})
    } else {
      //3. username can be used, now hash the password
      //3.1 generate the salt 
      const salt = bcrypt.genSaltSync(saltrounds)

      //3.2 hash the password
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);

      //4. Create account 
      User.create({
        username: req.body.username,
        password: hashedPassword
      })
      .then((createdUser)=>{
        //5. create the JSON Web token (JWT)
        //5.1 Create the payload
        const payload = {_id: createdUser._id}

        //5.2 create the token
        const token = jwt.sign(payload, process.env.SECRET,
          { algorithm: "HS256", expiresIn: "24hr"}
        )

        res.json({token: token})

      })
      .catch((err)=>{
        res.json(err.message)
      })
    }


  })
  .catch((err)=>{
    res.json(err.message)
  })
});

router.post('/login', function(req, res, next) {
  //Make sure fields are filled in 
  if(!req.body.username || !req.body.password) {
    return res.json({message: "Please fill out both fields"})
  }

  //2. check username
  User.findOne({username: req.body.username})
  .then((foundUser)=>{
    //2.1 make sure username exists
    if(!foundUser){
      return res.json({message: "Username or password incorrect"})
    }
    //2.2 make sure passwords match
    const doesMatch = bcrypt.compareSync(req.body.password, foundUser.password)
    
    //3. create the token 
    if(doesMatch){
      const payload = {_id: foundUser._id}

        //5.2 create the token
        const token = jwt.sign(payload, process.env.SECRET,
          { algorithm: "HS256", expiresIn: "24hr"}
        )

        res.json({token: token})
    } else {
      return res.json({message: "Username or password incorrect"})
    }

  })
  .catch((err)=>{
    res.json(err.message)
  })
});

router.get('/login/test', isLoggedIn, (req, res)=>{
  res.json({message:"You are logged in"})
})





module.exports = router;
