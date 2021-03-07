var mongoose = require('mongoose');
var Schema = mongoose.Schema; 
var User = require('./user')

// const {user} = useContext(AuthContext);
var data = {
    get: "",
    key: ""
}
var pantrySchema = new Schema({
    id:{
        type: String,
        required:true
    },
    getgot:[{
        data: "",
        key: ""
    }],
    getwant:[{
        data: "",
        key: ""
    }]
})

module.exports = mongoose.model('Pantry', pantrySchema)