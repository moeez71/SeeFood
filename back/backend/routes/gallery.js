var express = require('express');
var router = express.Router();
var Gallery = require('../models/gallery');

router.get('/', function(req, res, next) {
    Gallery.find().exec(function(error,results){
      if(error){
          return next(error)
      }
      res.json(results)
  })
})

router.get('/find/:uid', function(req, res, next) {
    Gallery.findOne({uid: req.params.uid}).exec(function(error,result){
      if(error){
          return res.status(400).json(err.message);
      }
      return res.status(200).json(result);
  })
  })

router.put("/add", (req, res) => {
    Gallery.findOne({uid: req.body.uid}).then( gallery => {
  
      if (gallery) {
        // return res.status(400).json("gallery already exists");
        Gallery.updateOne(
            {uid: req.body.uid}, 
            {$push: {gallery: [{img: req.body.link}]}},
            function(err, result) {
                if (err) 
                    return res.status(400).json(err.message);
                else 
                    return res.status(200).json(result);
                }
            )
        }
      
      //gallery doesnt exist:
      else {
  
        const newGallery = new Gallery({
            uid: req.body.uid,
            gallery: [
                {img: req.body.link},
            ]
        });
        
        Gallery.create(newGallery).then( (gallery, err) => {
    
            if(err)
            console.log(err.message);
    
            return res.status(200).json({message: "gallery created!", gallery: gallery});
    
        })}

    })
        
  });


module.exports = router;