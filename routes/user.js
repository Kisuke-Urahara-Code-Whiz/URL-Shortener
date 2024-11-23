const express = require("express");
const {handleUserSignup,handleUserLogin} = require("../controllers/user")
const logger = express.Router();

logger.post("/",handleUserSignup);

logger.get("/",(req,res)=>{
    res.render("signup.ejs");
})

logger.post("/login",handleUserLogin);

logger.get("/login",(req,res)=>{
    res.render("login.ejs");
})

module.exports = logger;