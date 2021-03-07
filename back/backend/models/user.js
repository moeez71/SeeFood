//import {AuthContext} from '../../../navigation/AuthProvider';
//import React, { useContext}  from 'react';
var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

// const {user} = useContext(AuthContext);
var userSchema = new Schema({
    id:{
        type:String,
        required: true
    }
})

module.exports = mongoose.model('User', userSchema)