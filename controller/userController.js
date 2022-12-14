//Import JWT just below the const bcrypt = require("bcrypt"):
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const dotenv = require('dotenv')
dotenv.config()
const SecretKey = process.env.SecretKey

const userModel = require('../database/userModel');

const signup = async(req,res)=>{
    //1. existing user check
    //2. Hashed password
    //3. user creation
    //4. token generation

    //create a new user instance and collect the data
    const {username, email, password} = req.body;

    try{
        const existingUser = await userModel.findOne({email: email})
        
        if(existingUser){
            return res.status(400).json({message:"user already exist"});
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await userModel.create({
            email: email,
            password: hashedPassword,
            username: username
        });

        // const token = jwt.sign(
        // {
        //     email: result.email,
        //     id: result._id
        // }, SecretKey);

        res.status(201).json({user: result});
    }

    catch(error){
        console.log(error);
        res.status(500).json({message:"Something went wrong"});
    }
}



const login = async (req,res)=>{
    const {email, password} = req.body;

    try{
        const existingUser = await userModel.findOne({email: email})

        if(!existingUser){
            return res.status(404).json({message:"user doesn't exist"});
        }

        const matchPassword = await bcrypt.compare(password, existingUser.password);

        if(!matchPassword){
            res.status(400).json({message:"invalid password"});
        }

        const token = jwt.sign(
        {
            email: existingUser.email,
            id: existingUser._id
        }, SecretKey);
        
        res.status(200).json({user:existingUser, token: token});

    }

    catch(error){
        console.log(error);
        res.status(500).json({message:"Something went wrong"});
    }
}

module.exports = {signup, login};
