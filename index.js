const express =  require("express");
const {connectToMongoDB} = require("./connect");
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const { timeStamp } = require("console");
const app = express();
const port = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url")
.then(()=>{console.log("Database connected")});

app.use(express.json());

app.use("/url",urlRoute); 

app.get("/:shortID",async (req,res)=>{
    const shortId = req.params.shortID;
    const entry = await URL.findOneAndUpdate({
        shortId
    },{$push:{
        visitHistory: {timeStamp:Date.now()},
    }})
    console.log(typeof(entry.redirectURL));
    res.redirect(`${entry.redirectURL}`);
})

app.listen(port,()=>{console.log("server online")});

