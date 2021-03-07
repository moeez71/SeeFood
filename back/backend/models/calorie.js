var mongoose = require('mongoose');
var Schema = mongoose.Schema; 
var User = require('./user')


var calorieSchema = new Schema({
    id:{
        type: String,
        required:true
    },
    calorie:[{
        calories: "", foodname: "", date: "" , key:"" , type: "" , serving: ""}
    ],
    
})

module.exports = mongoose.model('Calorie', calorieSchema)