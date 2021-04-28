//import {AuthContext} from '../../../navigation/AuthProvider';
//import React, { useContext}  from 'react';
var express = require('express');
var router = express.Router();
//var user01 = require('../../../navigation/AuthProvider')
var User = require('../models/user')
//var MyUser = require('../../../screens/UserName')
//var MyUser = Module.U1

//const {user} = useContext(AuthContext);
const U1 = new User ({
  id: "Moeez Atlas Baig"
})

/* GET users listing. */

// router.get('/', function(req, res, next) {
//   User.findOne({id : req.body.id}).count().exec(function(error,results){
//     if(error){
//         return next(error)
//     }
//     res.json(results)
// })
// })


router.get('/', function(req, res, next) {
  User.find().exec(function(error,results){
    if(error){
        return next(error)
    }
    res.json(results)
})
})

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
      User.create(req.body).then((teacher)=>{
        console.log("Doctor Adeed", teacher)
        // res.statusCode= 200
        // res.setHeader('content-Type', 'application/json')
        // res.json(teacher);
    }, (err)=> {
        return next(err).catch((err)=>next(err))
    })
    }
})
})


//   User.create(req.body).then((teacher)=>{
//       console.log("Doctor Adeed", teacher)
//       res.statusCode= 200
//       res.setHeader('content-Type', 'application/json')
//       res.json(teacher);
//   }, (err)=> {
//       next(err).catch((err)=>next(err))
//   })
// })

module.exports = router;
