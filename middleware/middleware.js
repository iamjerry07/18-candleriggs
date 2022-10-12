const jwt = require("jsonwebtoken")
const bannerModel = require("../models/bannerSchema")
const eventModel = require("../models/eventSchema")
const adminLoginModel = require('../models/adminLoginModel')

const mongoose = require("mongoose")
const objectId = mongoose.Types.ObjectId

//////////// AUTHENTICATION ///////////////////

let authentication = async function (req, res, next) {
    try {
        let token = req.headers["authorisation"]
        if (!token) return res.status(404).send({ status: false, msg: "token must be present" });
        let decodedToken = jwt.verify(token, "18-candleriggs");
        if (!decodedToken)
            return res.status(400).send({ status: false, msg: "Invalid Token" })
        else {
            req["decodedToken"] = decodedToken
        }
        next();
    }
    catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    }
}


// const authentication = async function(req, res, next){
//     try{
//         const token = req.headers["authorization"];
         
//         if(!token){
//             return res.status(400).send({status:false, msg: " token is required"})
//         }
//         const bearer= token.split(" ")[1];
      
//         console.log(bearer)
//         const decodedtoken =jwt.verify(bearer, "18-candleriggs")
//         console.log(decodedtoken)
//         if(!decodedtoken){
//             return res.status(400).send({status:false, msg: "token is invalid"})
//         }
//         req.userId = decodedtoken.userId

//         next();
    // }
    // catch(error){
    //     return res.status(500).send({status:false,msg: error.message})
    // }
// }
module.exports.authentication=authentication



