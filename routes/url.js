const express=  require("express");
const {generate,updateClick} = require("../controllers/url");
const router =  express.Router();

router.post("/",generate);

router.get("/:shortID",updateClick);


module.exports = router;