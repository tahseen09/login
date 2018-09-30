var express=require('express')
var mongoose=require('mongoose');

var Schema=mongoose.Schema;

var credential= new Schema({
        uname: {type:String, unique: true},
        password: String
});

module.exports = mongoose.model('Credential',credential);