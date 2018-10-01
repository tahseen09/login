var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var credential = require('./model/credentials');
var bcrypt = require('bcryptjs')

var db=mongoose.connect("mongodb://localhost/userdb");

var app= express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(express.static('public'));

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
       // return res.send("You are logged in succesfully.");
});
});

app.listen(3000,function(){
    console.log("Server started at 3000");
});