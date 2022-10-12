const adminLoginModel = require('../models/adminLoginModel')
const mongoose = require('mongoose')
const jwt = require("jsonwebtoken")

let isValid = function (value) {
    if (typeof value === 'undefined' || value === null) return false;
    if (typeof value === 'string' && value.trim().length === 0) return false;
    return true;
}

let isValidEmail = function (email) {
    let emailRegex = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
    return emailRegex.test(email);
}

///////////////////// LOGIN ADMIN ////////////////////////

const loginAdmin = async function(req,res){
    try {
  //==validating request body==//
     let requestBody = req.body
    // if (!isValidRequestBody(requestBody)) return res.status(400).send({ status: false, msg: "Invalid request, please provide details"})  
    const {email, password} = requestBody;
  
  //==validating email==//
    if (!isValid(email)) return res.status(400).send({ status: false, msg: "email is a mandatory field" })
    if (!isValidEmail(email)) return res.status(400).send({ status: false, msg: `${email} is not valid` })
       
  //==validating password==//
    if(!isValid(password))return res.status(400).send({status:false, message: `Password is required`})
           
  //==finding userDocument==//      
  const user = await adminLoginModel.findOne({ email:email });
  
  if (!user) {
    res.status(404).send({ status: false, message: `${email} related Admin unavailable` });
    return
  }
//   const isLogin = await bcrypt.compare(password, user.password).catch(e => false)
//   if (!isLogin) {
//     res.status(401).send({ status: false, message: `wrong email address or password` });
//     return
//   }
        
  //==creating token==//   
  let token = jwt.sign(
    {
        adminId:  user._id.toString(),
        // iat: Math.floor(Date.now() / 1000),
        // exp: Math.floor(Date.now() / 1000) + 96 * 60 * 60 //4days
    },
    "18-candleriggs"
  );
  
  //==sending and setting token==// 
       res.header('authorization',token);
       res.status(200).send({status:true, message:`User login successfully`, data:{token}});
       
   } catch (error) {
       res.status(500).send({status:false, message:error.message});
   }
  }


  module.exports.loginAdmin = loginAdmin
