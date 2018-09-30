var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var credential = require('./model/credentials');

var db=mongoose.connect("mongodb://localhost/login");

var app= express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.post('/register', function(req,res){
    var cred= new credential(req.body);
    cred.save(function(err,newuser){
        if(err){
            res.status(500).send({error: "UserName Exists"});
        }
        else{
            res.status(200).send("New User Created");
        }
    })
})

app.post('/login',function(req,res){
    console.log(req.body)
    credential.findOne({
        uname: req.body.uname,
        password: req.body.password
      },
         function(err,user){
             console.log(user);
        if(err){
            
           return res.status(500).send(err);
        }
        if (!user) { return res.status(200).send("User not found"); }

      return res.status(200).send("You are logged in succesfully.");
});
});

app.listen(3000,function(){
    console.log("Server started at 3000");
});