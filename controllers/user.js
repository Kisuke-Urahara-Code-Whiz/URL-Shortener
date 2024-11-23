const User = require("../models/user");
const express = require("express");
const {v4: uuidv4} = require("uuid");
const {setUser,getUser} =  require("../service/auth")

async function handleUserSignup(req,res){

    const {name,email,password} = req.body;
    await User.create({
        name,
        email,
        password
    });
    return res.redirect("/");


}


async function handleUserLogin(req,res){

    const {email,password} = req.body;
    const user =  await User.findOne({email,password});
    if(!user){
        res.render("login.ejs",{
            error : "Invalid username or password"
        });
    }
    else{
        const sessionId = uuidv4();
        setUser(sessionId,user);
        res.cookie("uid",sessionId);
        res.redirect("/");
    }    


}


module.exports = {
    handleUserSignup,
    handleUserLogin,
}