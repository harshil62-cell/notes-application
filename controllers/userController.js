const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const User=require('../models/userModel');
const { validationResult } = require('express-validator');

const registerUser=async(req,res)=>{
     const errors = validationResult(req);
     if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try{
    const {username,email,password}=req.body;
    if(!username || !email || !password){
        res.status(400).json({
            success:false,
            message:"All fields are required"
        });
    }

    const userAvailable=await User.findOne({email});

    if(userAvailable){
        res.status(400).json({
            success:false,
            message:"User already registered"
        });
    }

    const hashedPassword=await bcrypt.hash(password,10);
    const user=await User.create({
        username,
        email,
        password:hashedPassword,
    });
    if(user){
        res.status(201).json({
            success:true,
            message:"User registered successfully",
            user:{
                _id:user.id,
                email:user.email,
            }
        });
    }else{
        res.status(400).json({
            success:false,
            message:"User data is not valid"
        });
    }
}catch(error){
    console.log(error);
    res.status(500).json({
        success:false,
        message:"Something is wrong on our side please try again later"
    });
}
};

module.exports={
    registerUser
};