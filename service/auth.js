// const SessionIdToUserMap = new Map();
const jwt = require("jsonwebtoken");
const secret = "secret";

function setUser(user){
    // SessionIdToUserMap.set(id,user);
    // const payload = {
    //     id,
    //     ...user,
    // };
    return jwt.sign({
        _id: user._id,
        email: user.email,
    },secret);
}

function getUser(token){
    if(!token) return null;
    try{
        return jwt.verify(token,secret);
    }
    catch{
        return null;
    }
    
}

module.exports = {
    setUser,
    getUser,
}