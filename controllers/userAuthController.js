import bcrypt from "bcryptjs"
import jwt from 'jsonwebtoken'
import User from "../models/userAuthModel.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ status: "failed", message: "User already exists" });
    }

    const user = await User.create({ name, email, password: hashPassword });
    return res.status(201).json({ status: "success", message: "User Created Successfully!" });
  } catch (error) {
    return res.status(500).json({ status: "failed", message: error.message });
  }
};



export const login=async(req , res)=>{
    try {
                 const {email , password}=req.body;
    const user=await User.findOne({email})
    if(!user){
        return res.json({message: 'User Not Registered'})
    }
    const isMatch=await bcrypt.compare(password , user.password)
   if (!isMatch){
        return res.json({ message:'Invalid Password'})
    }


    const token =jwt.sign({id:user._id} , process.env.SECRET_KEY , {expiresIn:'1d'})

    res.json({message: 'Login Successfully!' , token:token})
    } catch (error) {

   return res.send(error.message)
    }
 
}