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
        hotOrIced: req.body.hotOrIced,
        description: req.body.description,
        hasEspresso: req.body.hasEspresso,
        hasMilk: req.body.hasMilk,
        ingredients: req.body.ingredients,
        alternativeMilks: req.body.alternativeMilks,
        creatorId: req.user._id,
    })
    .then((createdDrink)=>{
        res.json(createdDrink)
    })
    .catch((error)=>{
        res.json(error.message);
    })
});

//POST DELETE DRINK 
router.post("/delete-drink/:drinkId", isLoggedIn, (req, res, next) =>{
    Drink.findByIdAndRemove(req.params.drinkId)
    .then(()=>{
        // console.log(deletedDrink)
        res.json({message: "Successfully deleted drink"})
    })
    .catch((err)=>{
        res.json(err.message) 
    })
})

//POST UPDATE DRINK
router.post("/:id/update-drink", isLoggedIn, (req, res, next)=>{
    console.log("drink", req.body)
    Drink.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        title: req.body.title,
        hotOrIced: req.body.hotOrIced,
        description: req.body.description,
        hasEspresso: req.body.hasEspresso,
        hasMilk: req.body.hasMilk,
        ingredients: req.body.ingredients,
        alternativeMilks: req.body.alternativeMilks,
        creatorId: req.user._id,
    }, {new: true})
    .then((updatedDrink)=>{
        console.log(updatedDrink)
        res.json({message: "successfully updated drink"})
    })
    .catch((err)=>{
        res.json(err.message)
    })
})

//GET UPDATE DRINK
router.get('/:id/update-drink', isLoggedIn, (req, res, next) => {
    Drink.findById(req.params.id)
    .then((usersDrinks)=>{
        console.log(usersDrinks)
        res.json(usersDrinks)
    })
    .catch((err)=>{
        res.json(err.message)
    })
  })


// //GET ALL USERS DRINKS  -- best implemented in the User Router
// router.get('/user-drinks', isLoggedIn, (req, res, next) => {
//     Drink.find({creatorId: req.user._id})
//     .then((usersDrinks)=>{
//         console.log(usersDrinks)
//         res.json({message: "here are the user's drinks"})
//     })
//     .catch((err)=>{
//         res.json(err.message)
//     })
// })

module.exports = router; 





