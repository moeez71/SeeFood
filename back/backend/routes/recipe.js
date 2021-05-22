var express = require('express');
var router = express.Router();
var Recipe = require('../models/recipe');

router.get('/', function(req, res, next) {
    Recipe.find().exec(function(error,results){
      if(error){
          return next(error)
      }
      res.json(results)
  })
})

router.get('/find/:uid', function(req, res, next) {
    Recipe.findOne({uid: req.params.uid}).exec(function(error,result){
      if(error){
          return res.status(400).json(err.message);
      }
      return res.status(200).json(result);
  })
  })

router.put("/add", (req, res) => {
    Recipe.findOne({uid: req.body.uid}).then( recipe => {
  
      if (recipe) {
        // return res.status(400).json("recipe already exists");
        Recipe.updateOne(
            {uid: req.body.uid}, 
            {$addToSet: {recipes: [{recipeId: req.body.recipeId}]}},
            function(err, result) {
                if (err) 
                    return res.status(400).json(err.message);
                else 
                    return res.status(200).json(result);
                }
            )
        }
      
      //recipe doesnt exist:
      else {
  
        const newRecipe = new Recipe({
            uid: req.body.uid,
            recipes: [
                {recipeId: req.body.recipeId},
            ]
        });
        
        Recipe.create(newRecipe).then( (recipe, err) => {
    
            if(err)
            console.log(err.message);
    
            return res.status(200).json({message: "recipe created!", recipe: recipe});
    
        })}

    })
        
  });


module.exports = router;