import {AuthContext} from '../navigation/AuthProvider';
var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

const {user} = useContext(AuthContext);
var userSchema = new Schema({
    id:{
        type:user.id,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)