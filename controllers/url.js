const {nanoid} = require("nanoid");
const URL = require("../models/url");

async function generate(req,res) {
    const body = req.body;
    if(!body.url){return res.status(400).json({error:"url is required"})}
    const shortID = nanoid(8);
    await URL.create({
        shortId : shortID,
        redirectURL: body.url,
        visitHistory:[],
        createdBy : req.user._id,
    });
    const data = await URL.find({});
    return res.render("home.ejs",{id:shortID, data:data});
;}

async function updateClick(req,res){
    const shortId = req.params.shortID;
    const entry = await URL.findOneAndUpdate({
        shortId
    },{$push:{
        visitHistory: {timeStamp:Date.now()},
    }})

    if(!entry){
        res.status(404).send("Error");
    }
    else{
        console.log(entry);
    }
    res.redirect(`${entry.redirectURL}`);
}

module.exports = {
    generate,
    updateClick,
}