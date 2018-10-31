var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var credential = require('./model/credentials'); //Schema import
var bcrypt = require('bcryptjs') //for encryption of password
var credential = require('./model/credentials.js')

mongoose.promise=global.Promise;

var db=mongoose.connect("mongodb://localhost/userdb"); //Connecting to the database

var app= express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static('public'));

//New User Registration

app.post('/register', function(req,res){
    
    var cred= new credential();
    cred.uname=req.body.uname;
    const hash = bcrypt.hashSync(req.body.password, 10);
    cred.password=hash;
    cred.save(function(err,newuser){
        if(err){
            res.status(500).send("Username exists");
        }
        else{
            res.status(200).send("New User Created");
        }
    })
})

//Login Authentication

app.post('/login',function(req,res){
    
    credential.findOne({
        uname: req.body.uname,
      },
         function(err,user){
        if(err){
           return res.status(500).send(err);
        }
        if (!user) { return res.status(200).send("User not found"); }
        else{
           const result = bcrypt.compareSync(req.body.password, user.password)
           if(result){
               return res.send("Logged In.")
           }
           if(!result){
               return res.send("Wrong password");
           }
        }
});
});

app.listen(3000,function(){
    console.log("Server started at 3000");
});
