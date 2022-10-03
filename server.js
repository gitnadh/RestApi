const express = require('express');
const app = express();
const port=4000
app.get('*', function(req, res){
    res.end('Hello World');
});
app.listen(port, function(){
  console.log(`The server is running , please open your browser at http://localhost:${port} ...`);
});

require('dotenv').config()
console.log(process.env)
const mongoose = require('mongoose')
const User = require("./models/Users");
const bodyParser = require("body-parser");

const express = require('express');

const app = express();
const port=4000
const mongoose = require('mongoose')
const User = require("./models/Users");
const bodyParser = require("body-parser");


app.get('*', function(req, res){
    res.end('Hello World');
});
app.listen(port, function(){
  console.log(`The server is running , please open your browser at http://localhost:${port} ...`);
});

require('dotenv').config()
console.log(process.env)

// connection to database---------------------------------------
mongoose.connect(process.env.MONGO_URI)
.then(()=>console.log("db connected"))
.catch(err => console.log(err))


//routes--------------------------------------------------------
app.post("/",async (req,res,next)=>{
    const newUser = new User(req.body);
    try{
        await newUser.save();
        res.status(201).json({message: "success"})
    }catch(error){
        res.status(500).send(error);
    }
});

app.get("/",async (req,res,next)=>{
    try{
        const users = await  User.find({});
        res.status(201).send(users);
    }catch(error){
        res.status(500).send(error);
    }
});
app.put("/:id",async (req,res,next)=>{
    try{
        const updateUser = await User.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body}
        );
        if(!updateUser){
            res.status(404).send("not found");
        }
        res.status(201).send(updateUser);

    }catch(error){
        res.status(500).send(error);
    }
});
app.delete("/:id",async (req,res,next)=>{
    try{await User.findOneAndDelete({_id:req.params.id})
    res.status(201).send("success");}
    catch(error){
        res.status(500).send(error);
    }
});
