//import {AuthContext} from '../../../navigation/AuthProvider';
//import React, { useContext}  from 'react';
var mongoose = require('mongoose');
var Schema = mongoose.Schema; 

// const {user} = useContext(AuthContext);
var userSchema = new Schema({
    uid:{
        type:String,
        required: true
    },
    firstName:{
        type:String,
        required: true
    },
    lastName:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true
    },
    phoneNumber:{
        type:String,
        required: false
    },
    photoURL:{
        type:String,
        required: false
    },
    providerId:{
        type:String,
        required: true
    },
    date: {
        type: String,
        default: new Date().toDateString(),
        required: false
    }
    
})

module.exports = mongoose.model('User', userSchema)