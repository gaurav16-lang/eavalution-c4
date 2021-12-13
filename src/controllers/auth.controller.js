require("dotenv").config();

const jwt = require("jsonwebtoken");

const User = require("../models/user.model");

const {body,validationResult}=require("express-validator")
const upload = require("../middleware/uploads")

const newToken = (user)=>{
    return jwt.sign({user:user},process.env.JWT_SECRET_KEY)
}

const register = async(req,res)=>{
    try{

        const errors = validationResult(req)

        if(!errors.isEmpty())
        {
            let newErrors = error.array().map(({msg,param,location})=>{
                return {
                    [param]:msg
                }
            })
            return res.status(400).json({errors:newErrors})
        }

        let user = await User.findOne({email:req.body.email}).lean().exec()
        if(user){
            return res.status(400).json({status:"Failed",message :"please provide different email address ,this email already exist" })
        }

        user = await User.create({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password,
            profile_photo_url:req.file.path,
            roles:req.body.roles
        })


        const token  = newToken(user)

        return res.status(201).send({user,token})



    }catch(e)
    {
return res.status(500).json({status:"Failed",message:e.message})
    }
}




const login = async(req,res)=>{
    try{

       let user = await User.findOne({email:req.body.email})
       if(!user)
       {
           return res.status(201).json({status:"Failed",message:"Please provide the valid email and password"});

           
       }
       const match  = await user.checkPassword(req.body.password)

       if(!match)
       {
        return res.status(201).json({status:"Failed",message:"Please provide the valid  password"});
       }

       const token  = newToken(user)
       return res.status(201).json({user,token})


    }catch(e)
    {
return res.status(500).json({status:"Failed",message:e.message})
    }
}



module.exports = {
    register,
    login
}