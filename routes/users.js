var express = require('express');
var router = express.Router();
const User = require('../models/User.models')
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const saltrounds = 10; 
require("dotenv/config"); 

const Drink = require("../models/Drink.models");

const isLoggedIn = require("../middleware/isLoggedIn")
const fileUploader = require("../middleware/cloudinary.config")

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//POST signup
router.post('/signup', function(req, res, next) {
  //1. Make sure fields are filled in 
  if(!req.body.username || !req.body.password) {
    return res.status(400).json({message: "Please fill out both fields"})
  }
  //2. Make sure username isn't taken
  User.findOne({username: req.body.username})
  .then((foundUser)=> {
    if(foundUser){
      return res.status(400).json({message: "Username is taken"})
    } else {
      //3. username can be used, now hash the password
      //3.1 generate the salt 
      const salt = bcrypt.genSaltSync(saltrounds)

      //3.2 hash the password
      const hashedPassword = bcrypt.hashSync(req.body.password, salt);

      //4. Create account 
      User.create({
        username: req.body.username,
        password: hashedPassword,
        profileImage: req.body.profileImage
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
        res.status(400).json(err.message)
      })
    }


  })
  .catch((err)=>{
    res.status(400).json(err.message)
  })
});

//POST LOG IN 
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

//TEST LOGIN GET 
router.get('/login/test', isLoggedIn, (req, res)=>{
  res.json({message:"You are logged in"})
})


//GET USER PROFILE DELETE
router.get('/delete', isLoggedIn, (req, res, next)=>{
  User.findByIdAndRemove(req.user._id)
  .then(()=>{
    res.json({message: "Successfully deleted account"})
  })
  .catch((err)=>{
    res.json(err.message)
  })
})

//GET USER PROFILE UPDATE PAGE
router.get('/user-update', isLoggedIn, (req, res, next)=>{
  User.findById(req.user._id)
  .then((foundUser)=>{
    res.json(foundUser)
  })
  .catch((err)=>{
    res.json(err.message);
  })
}); 

//POST USER PROFILE UPDATE PAGE 
router.post('/user-update', isLoggedIn, fileUploader.single("imageUrl"), (req, res, next)=> {
  User.findByIdAndUpdate(req.user._id, {
    username: req.body.username,
        // password: hashedPassword,
    profileImage: req.body.profileImage
  }, {new: true})
  .then((updatedUser)=>{
    res.json({updatedUser})
  })
  .catch((err)=>{
    res.json(err.message)
  })
});

//GET USER PROFILE PAGE
router.get('/user-home', isLoggedIn, (req, res, next)=>{
  User.findById(req.user._id)
  .then((foundUser)=>{
    console.log(foundUser)
  })
  .catch((err)=>{
    res.json(err.message);
  })
}); 

//GET ALL USERS DRINKS 
router.get('/user-profile/users-drinks', isLoggedIn, (req, res, next) => {
  Drink.find({creatorId: req.user._id})
  .then((usersDrinks)=>{
      console.log(usersDrinks)
      res.json(usersDrinks)
  })
  .catch((err)=>{
      res.json(err.message)
  })
})

//POST IMAGE UPLOADER FOR PROFILE PICTURES
router.post("/signup-image", fileUploader.single("imageUrl"), (req, res, next)=>{
  res.json(req.file.path); 
})
// .then(())




module.exports = router;
