var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

var searchSchema = new Schema({
    uid:{
        type:String,
        required: true
    },
    searches: [{
        searchQuery: ""
    }]
})

module.exports = mongoose.model('Search', searchSchema)