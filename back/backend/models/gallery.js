var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var gallerySchema = new Schema({
    uid:{
        type:String,
        required: true
    },
    gallery: [{
        img: ""
    }]
})

module.exports = mongoose.model('Gallery', gallerySchema)