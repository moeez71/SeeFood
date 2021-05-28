var express = require('express');
var router = express.Router();
var Search = require('../models/search');

router.get('/', function(req, res, next) {
    Search.find().exec(function(error,results){
      if(error){
          return next(error)
      }
      res.json(results)
  })
})

router.get('/find/:uid', function(req, res, next) {
    Search.findOne({uid: req.params.uid}).exec(function(error,result){
      if(error){
          return res.status(400).json(err.message);
      }
      return res.status(200).json(result);
  })
  })

router.put("/add", (req, res) => {
    Search.findOne({uid: req.body.uid}).then( search => {
  
      if (search) {
        // return res.status(400).json("search already exists");
        Search.updateOne(
            {uid: req.body.uid}, 
            {$addToSet: {searches: [{searchQuery: req.body.searchQuery}]}},
            function(err, result) {
                if (err) 
                    return res.status(400).json(err.message);
                else 
                    return res.status(200).json(result);
                }
            )
        }
      
      //search doesnt exist:
      else {
  
        const newSearch = new Search({
            uid: req.body.uid,
            searches: [
                {searchQuery: req.body.searchQuery},
            ]
        });
        
        Search.create(newSearch).then( (search, err) => {
    
            if(err)
            console.log(err.message);
    
            return res.status(200).json({message: "search created!", search: search});
    
        })}

    })
        
  });

  router.put("/remove", (req, res) => {
    Search.findOne({uid: req.body.uid}).then( search => {
  
      if (search) {
        // return res.status(400).json("search already exists");
        Search.updateOne(
            {uid: req.body.uid}, 
            {$pull: {searchs: {searchId : req.body.searchId} } },
            function(err, result) {
                if (err) 
                    return res.status(400).json(err.message);
                else 
                    return res.status(200).json(result);
                }
            )
        }
      
      //search doesnt exist:
      else {
  
        return res.json("Search not found!");
    }

    })
        
  });


module.exports = router;