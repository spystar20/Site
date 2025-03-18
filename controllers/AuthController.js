const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const UserModel=require("../models/user")
const signup = async(req,res)=>{
    try{
        const {name,email,password,phone}= req.body
        const user = await UserModel.FindOne({email})
        if (user){
            return res.status (409)
            .json({message:"user already exist ", success:false})
        }
        const UserModel = new UserModel({name,email,password,phone})
        UserModel.password=await bcrypt.hash(password,10)
        await UserModel.save()
        res.status(201)
        .json({
            message:"signup successfully",
            success:true
        })
    }catch (err){
res.status(500)
.json({
    message:"internal server error",
    success:false
})
    }
}
const Login = async(req,res)=>{
    try{
        const {email,password}= req.body
        const user = await UserModel.FindOne({email})
           const errorMsg="Auth failed email or password is wrong"
        
        if (!user){
            return res.status (403)
            .json({message:errorMsg, success:false})
        }
    const isPassEqual=await bcrypt.compare(password,user.password)
    if(!isPassEqual){
        return res.status(403)
        .json({message:errorMsg,success:false})
    }
    const jwtToken=jwt.sign(
        {
            email:user.email,_id:user._id},
            process.env.JWT_SECRET,
            {expiresIn:'24h'}
        
    )
        res.status(201)
        .json({
            message:"Login successfully",
            success:true,
            jwtToken,email,name:user.name
        })
    }catch (err){
res.status(500)
.json({
    message:"internal server error",
    success:false
})
    }
}
module.exports={signup,Login}