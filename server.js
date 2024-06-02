const bodyParser = require("body-parser");
const express=require("express");
const session=require("express-session");
const{v4:uuidv4}=require("uuid");

const helloRouter=require("./router.js");
const cookie=require("cookie-parser")
const {restart}=require('nodemon');
const cache=require('nocache');

const app=express();
const path= require("path");
const PORT = process.env.PORT||3000;

app.use(cache());
app.use(cookie());


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

app.set("view engine","ejs");

//home route
app.use(express.static("public"));


app.use(session({
  secret:'keyboard cat',
  resave:false,
  saveUninitialized:true,
  cookie: { secure:false }
}));


app.use('/route',helloRouter);


app.get("/",(req,res)=>{
  if(req.cookies.email&&req.cookies.password){
    res.redirect('/route/dashboard')
  } 
  else{
    res.render("base",{title:"Login System"});
  }
  
}) 

app.listen(3001);