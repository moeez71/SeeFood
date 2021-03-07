var mongoose = require('mongoose');
var Schema = mongoose.Schema; 
var User = require('./user')


var calorieLimit = new Schema({
    id:{
        type: String,
        required:true
    },
    limit: {
        type: String,
        required:true
    }
    
})

module.exports = mongoose.model('Limit', calorieLimit)