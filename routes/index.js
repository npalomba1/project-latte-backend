var express = require('express');
var router = express.Router();

const User = require("../models/User.models")
const isLoggedIn = require("../middleware/isLoggedIn")
const fileUploader = require("../middleware/cloudinary.config"); 


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.post("/new-image", isLoggedIn, fileUploader.single("imageUrl"), (req, res, next)=>{

//   res.json(req.file)
// })

module.exports = router;
