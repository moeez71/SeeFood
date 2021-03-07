var express = require('express');
var router = express.Router();

var Calorie = require('../models/calorie')

// const U1 = new User ({
//   id: "Moeez Atlas Baig"
// })


router.get('/', function(req, res, next) {
  Calorie.find().exec(function(error,results){
    if(error){
        return next(error)
    }
    res.json(results)
})
})

router.get('/calorie/:id', function(req, res, next) {
  Calorie.findOne({id: req.params.id}).exec(function(error,results){
    if(error){
        return next(error)
    }
    res.json(results)
    console.log(results)
})
})

router.post('/add', function(req, res, next) {
  Calorie.create(req.body).then((user)=>{
    console.log("User Added", user)
    res.statusCode= 200
    res.setHeader('content-Type', 'application/json')
    res.json(user);
}, (err)=> {
    next(err).catch((err)=>next(err))
})
});

router.post('/adduser', function(req,res,next){
  Calorie.findOneAndUpdate({ id: req.body.id }, { calorie: req.body.calorie }, {new: true}).exec(function(error,results){
    if(error){
        return next(error)
    }
    res.json(results)
})
})

router.post('/adduser1', function(req,res,next){
    Calorie.findOne({id : req.body.id}).countDocuments().exec(function(error,results){
      if(error){
          return next(error)
      } 
      res.json(results)
       if (results < 1) {
         Calorie.create(req.body).then((teacher)=>{
           console.log("Doctor Adeed", teacher)
        //    res.statusCode= 200
        //    res.setHeader('content-Type', 'application/json')
        //    res.json(teacher);
       }, (err)=> {
           return next(err).catch((err)=>next(err))
       })
       }
       if (results === 1) {
        Calorie.findOneAndUpdate({ id: req.body.id }, { calorie: req.body.calorie}, {new: true} ).exec(function(error,results){
            if(error){
                return next(error)
            }
            //res.json(results)
        })
    
    }
  })
  })
  


module.exports = router;
