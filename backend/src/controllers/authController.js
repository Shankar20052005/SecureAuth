import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
//Cookies to store the signup data using JSON Web Tokens (JWT) and used during Login

export const Signup = async(req,res) =>{
    try{
        //res.send("Signup is called");
        const {name,email,password} = req.body;
        
        //Empty fields
        if(!name || !email || !password){
            return res.status(400).json({message: "Please fill all the fields", success:false, error:true,});
        }

        //Existing Users
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return res.status(400).json({message: "User already exists", success:false, error:true,});
        }

        const user = new userModel({
            name,email,password,
        });

        //brcypt hashing
        user.password = await bcrypt.hash(password,10); //salt

        await user.save();
        res.status(201).json({message: "User registered successfully", success:true, error:false,})
    }
    catch (error){
        console.log(error);
        res.send(401).json({message: "Error in Registering User", success:false, error:true,});
    }
};
export const Login = async(req,res) =>{
    try{
        //res.send("Login is called");
        const {email,password} = req.body;

        //Empty fields
        if(!email || !password){
            return res.status(400).json({message: "Please fill all the fields", success:false, error:true,});
        }

        //Checks if User exists and valid
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({message: "User does not exist", success:false, error:true,});
        }

        //Password Matching
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: "Invalid Email or Password", success:false, error:true,});
        }

        //JWT Token
        const jwtToken = jwt.sign({email:user.email, _id: user._id}, process.env.JWT_SECRET, {expiresIn: "1h"})

        //User Logged in Successfully
        res.status(200).json({message: "User Logged in successfully", success:true, error:false, jwtToken, email, name:user.name,
        });
    }
    catch (error){
        console.log(error);
        res.status(401).json({message: "Error in Login", success:false, error:true,});
    }
};