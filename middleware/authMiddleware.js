import jwt from 'jsonwebtoken'


const verifyToken=(req , res , next)=>{
const authHeader=req.headers.authorization ||  req.headers.Authorization

if(!authHeader){
  return  res.json({message: 'Authorization header not found'})
}
const token =authHeader.split(' ')[1];
if(!token){
   return res.json({message: 'Token Not Found'})
}


try {
    const decoded=jwt.verify(token , process.env.SECRET_KEY)
req.user=decoded;
next()
} catch (error) {
return res.json(error.message)   
}



}
export default verifyToken