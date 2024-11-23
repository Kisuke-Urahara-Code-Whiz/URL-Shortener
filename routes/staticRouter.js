const express = require("express");
const URL = require("../models/url");
const router = express.Router();

router.get("/",async (req,res)=>{
    if(!req.user){return res.redirect("/login");}
    const data = await URL.find({createdBy: req.user._id});
    res.render("home.ejs",{data});
})

module.exports = router;