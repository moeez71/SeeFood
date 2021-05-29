var express = require('express');
var router = express.Router();
var User = require('../models/user')

const U1 = new User ({
  id: "Moeez Atlas Baig"
})




router.get('/', function(req, res, next) {
  User.find().exec(function(error,results){
    if(error){
        return next(error)
    }
    res.json(results)
})
})

router.get('/find/:uid', function(req, res, next) {
  User.findOne({uid: req.params.uid}).exec(function(error,result){
    if(error){
        return res.status(400).json(err.message);
    }
    return res.status(200).json(result);
})
})

router.post("/register", (req, res) => {
  console.log(req.body);
  User.findOne({email: req.body.email}).then( user => {
    

    if (user)
      return res.status(400).json("user already exists");
    
    //user doesnt exist:

    const newUser = new User(req.body);
    
    User.create(newUser).then( (user, err) => {

      if(err)
        console.log(err.message);

      return res.status(200).json({message: "user created!", user: user});

    })
    

  })
});


router.post("/updateUser", (req, res) => {
  User.findOneAndReplace({uid: req.body.uid}, req.body, null, ( (err, doc) => {
  
  if(err)
    return res.status(400).json(err.message);
  
  return res.status(200).json({message: "user updated successfully!", user: doc});

  })) 
    
});


router.post('/add', function(req, res, next) {
  User.create(req.body).then((user)=>{
    console.log("User Added", user)
    res.statusCode= 200
    res.setHeader('content-Type', 'application/json')
    res.json(user);
}, (err)=> {
    next(err).catch((err)=>next(err))
})
});

router.post('/adduser', function(req,res,next){
  User.findOne({id : req.body.id}).countDocuments().exec(function(error,results){
    if(error){
        return next(error)
    }
    res.json(results)
    if (results < 1) {
      User.create(req.body).then((user)=>{
        console.log("User Adeed", user)
        // res.statusCode= 200
        // res.setHeader('content-Type', 'application/json')
        // res.json(teacher);
    }, (err)=> {
        return next(err).catch((err)=>next(err))
    })
    }
})
})

module.exports = router;