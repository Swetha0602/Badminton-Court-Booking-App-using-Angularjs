const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const mongodb = require("mongodb").MongoClient;
const app = express();
app.use(cors());
app.use(bodyparser.json());
mongodb.connect("mongodb+srv://swetha:govindasamy@cluster0.hlo7f.mongodb.net/Miniproject?retryWrites=true&w=majority", (error, result)=>{

    if(error)
    {
        console.log("DB not connected");
    }
    else{
        db = result.db("Miniproject")
        console.log("DB connected successfully");
    }
});

app.use((req, res, next)=>{

    console.log("Middleware 1");
    next();

});
app.use("/home",(req, res, next)=>{

    console.log("Middleware 2");
    next();

});
function verifyUser(req, res, next)
{
    console.log("User Verified");    
    next();
}




app.get("/", (req, res)=>{

    console.log("Index page");
    res.send("Welcome to Phoenix Badminton Council");
});
app.get("/home",verifyUser, (req, res)=>{

    console.log("Home page");
    var data = {a:"hi" , b:"hello"};
    res.json("data");
});  

app.post("/register", (req,res)=>{
    req.body._id = new Date().getTime();
    console.log(req.body);
    db.collection("badminton").insertOne(req.body, (error,data)=>{
        if(error)
        {
            res.json(403).json("Error In Inserting Document");
        }
        else
        {
            res.json("User Registered Successfully");
        }
    })
    
});
app.post("/login", (req,res)=>{

    console.log(req.body);
    db.collection("badminton").find(req.body, {projection: {_id:1,uname:1}}).toArray((error, data)=>{

        if(error)
        {
            res.json(403).json("Error In Finding Document");
        }
        else
        {
            res.json(data);
        }

    });
    

});
app.get("/allusers", (req, res)=>{

    db.collection("badminton").find(null, {projection: {upassword : 0}}).toArray((error, data)=>{
 
     if(error)
     {
         res.status(403).json("Error in Finding the Doc");
     }
     else {
        res.json(data);
     }
 
    });
 });
 
 app.get("/usernamecheck/:username", (req, res)=>{
 
     console.log(req.params.username);
 
     db.collection("badminton").find({uname : req.params.username}, {projection: {_id : 1}}).toArray((error, data)=>{
 
         if(error)
         {
             res.status(403).json("Error in Finding the Doc");
         }
         else {
            res.json(data);
         }
     
        });
 });

 app.get("/getuser/:userid", (req,res)=>{

    console.log(req.params);
    db.collection("badminton").find({_id : Number(req.params.userid)}).toArray((error, data)=>{
 
        if(error)
        {
            res.status(403).json("Error in Finding the Doc");
        }
        else {
           res.json(data);
        }
    
       });
 });
 app.put("/updateuser",(req,res)=>{

    console.log(req.body);
    var condition = {_id : req.body._id};
    var newValues = {$set : {uname:req.body.uname, uemail:req.body.uemail, upassword:req.body.upassword, uphone:req.body.uphone}};
    db.collection("badminton").update(condition, newValues, (error, data)=>{

        if(error)
        {
            res.status(403).json("Error in Updating the Doc");
        }
        else {
            res.json("User Data Updated Successfully");
        }

    })
    

 });
 
 app.delete("/deleteuser/:userid", (req, res)=>{

    console.log(req.params);
    db.collection("badminton").deleteOne({_id: Number(req.params.userid)}, (error, data)=>{

        res.json("User Deleted Successfully");

    });
    

 });

 app.get("/searchuser/:searchtxt?", (req,res)=>{

    console.log(req.params.searchtxt);
    if(req.params.searchtxt!= undefined)
    {
        var search = new RegExp(req.params.searchtxt, "i");
        var serachCond = {uname : search};
    }
    else
    {
        var serachCond = null;
    }
    
    
    db.collection("badminton").find(serachCond).toArray((error, data)=>{
        res.json(data);
    });
 });

 

module.exports = app;