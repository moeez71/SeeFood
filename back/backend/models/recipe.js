var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var recipeSchema = new Schema({
    uid:{
        type:String,
        required: true
    },
    recipes: [{
        recipeId: ""
    }]
})

module.exports = mongoose.model('Recipe', recipeSchema)