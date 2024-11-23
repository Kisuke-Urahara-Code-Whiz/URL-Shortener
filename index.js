const express =  require("express");
const {connectToMongoDB} = require("./connect");
const path = require("path");
const urlRoute = require("./routes/url");
const router = require("./routes/staticRouter");
const URL = require("./models/url");
const { timeStamp } = require("console");
const logger = require("./routes/user");
const cookieParser = require("cookie-parser");
const restrictToLoggedInUserOnly = require("./middlewares/auth");
const app = express();
const port = 8001;

connectToMongoDB("mongodb://localhost:27017/short-url")
.then(()=>{console.log("Database connected")});

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());

app.use("/signup",logger);

app.use("/url", restrictToLoggedInUserOnly, urlRoute); 

app.use("/",router);



app.listen(port,()=>{console.log("server online")});

