const express=require("express");
const router=express.Router();

const credential={
  email:"itsmeuser1028@gmail.com",
  password:"admin123"
}

//login user
router.post('/login',(req,res)=>{
  if(req.body.email==credential.email && req.body.password==credential.password)
  {   
    res.cookie("email",req.body.email);
    res.cookie("password",req.body.password);
    res.redirect('/route/dashboard');
  }
  else{
    res.render("base",{Invalid:"invalid",title:"Login system"});
  }
})

router.get("/dashboard",(req,res)=>{ 
    
   const email=req.cookies.email;
   const password=req.cookies.password;

  if(email&&password)
  {
    res.render("dashboard",{title:"Home",user:email});
  }
  else
  {
    res.redirect("/");
  }
}) 

router.get("/logout",(req,res)=>{

  res.clearCookie("password");
  res.clearCookie("email");
  res.redirect("/route/dashboard");
})

module.exports=router;