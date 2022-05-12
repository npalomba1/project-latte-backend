var express = require('express');
var router = express.Router();
const User = require('../models/User.models')
const bcrypt = require('bcryptjs'); 
const jwt = require('jsonwebtoken'); 
const saltrounds = 10; 
require("dotenv/config"); 

const isLoggedIn = require("../middleware/isLoggedIn");
const Drink = require('../models/Drink.models');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//POST CREATE DRINK 
router.post("/build-drink", isLoggedIn, (req, res, next)=>{
    Drink.create({
        name: req.body.name,
        title: req.body.title,
        ingredients: req.body.ingredients,
        creatorId: req.user._id,
        

    })
    .then((createdDrink)=>{
        res.json(createdDrink)
    })
    .catch((error)=>{
        res.json(error.message);
    })
});

module.exports = router; 





