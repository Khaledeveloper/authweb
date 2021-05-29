const express = require('express')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

exports.requireSignin = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token, process.env.JWT_SECRET);
    req.user = user;
  } else {
    return res.status(400).json({ message: "Authorization required" });
  }
  next();
  //jwt.decode()
};

exports.userMiddleware = (req, res, next) => {
  if (req.user.role !== "user") {
    return res.status(400).json({ message: "User access denied" });
  }
  next();
};

exports.adminMiddleware = (req, res, next) => {
  if (req.user.role !== "admin") {
    if (req.user.role !== "super-admin") {
      return res.status(400).json({ message: "Admin access denied" });
    }
  }
  next();
};

exports.superAdminMiddleware = (req, res, next) => {
  if (req.user.role !== "super-admin") {
    return res.status(200).json({ message: "Super Admin access denied" });
  }
  next();
};






const authToken = async(req ,res , next) =>{
    try {
        
        const token = req.header('Authorization').replace('Bearer ','')
        
        const decoded = jwt.verify(token, 'secret')
        //send another status if token expired to refresh it
        const user = await User.findOne({ _id: decoded._id, 'tokens.token': token })
      
        if (!user) {
            throw new Error()
        }
        req.token = token
        req.user = user
        
        next()
    } catch (error) {
        //expired TokenExpiredError
        //invaild JsonWebTokenError
        res.status(401).send({ error: error.name })
        console.log( error.name);
        
    }
   
    
}



module.exports = authToken