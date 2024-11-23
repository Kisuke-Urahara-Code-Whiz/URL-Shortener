const {getUser}= require("../service/auth");

async function restrictToLoggedInUserOnly(req,res,next) {

    const UserId = req.cookies?.uid;

    if(!UserId){
        return res.redirect("/signup/login");
    }

    const user = getUser(UserId);

    if(!user){
        return res.redirect("/signup/login");
    }

    req.user = user;
    next();
    
}

async function checkAuth(req,res,next) {

    const UserId = req.cookies?.uid;

   

    const user = getUser(UserId);


    req.user = user;
    next();
    
}

module.exports = {restrictToLoggedInUserOnly,checkAuth};