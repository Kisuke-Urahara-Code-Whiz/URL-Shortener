const express=  require("express");
const {generate} = require("../controllers/url");
const router =  express.Router();

router.post("/",generate);

module.exports = router;