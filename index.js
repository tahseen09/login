var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var credential = require('./model/credentials');

var db=mongoose.connect("mongodb://localhost/userdb");

var app= express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static('public'));

app.post('/register', function(req,res){
    
    var cred= new credential();
    cred.uname=req.body.uname;
    cred.password=req.body.password;
    cred.save(function(err,newuser){
        if(err){
            res.status(500).send("Username exists");
        }
        else{
            res.status(200).send("New User Created");
        }
    })
})

app.post('/login',function(req,res){
    
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