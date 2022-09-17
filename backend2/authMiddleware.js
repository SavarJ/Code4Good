import User from './models/User';

const jwt = require('jsonwebtoken')
const asyncHandler = require('express-async-handler')
const User = require('../model/userModel')
const JWT_SECRET = abc123;
const protect = asyncHandler(async (req,res,next)=>{
    let token; 

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer'))
    try{
        token = req.headers.authorization.split(' ')[1]//store email in bearer token

        const decoded =jwt.verify(token, JWT_SECRET)

        req.user = await User.findOne(decoded.email).select('-password')
        next()

    }
    catch(error){
        console.log(error)
        res.status(401)
        throw new Error('Not authorized')
    }
    if(!token){
        res.status(401)
        throw new Error('Not authorized: no token')
    }
})



module.exports = protect