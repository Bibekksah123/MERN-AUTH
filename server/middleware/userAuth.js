import jwt from 'jsonwebtoken'
const userAuth=async(req,res,next)=>{
    const {token}=req.body
    if(!token){
      return res.json({Success:false,message:'Not Authorized Login Again'})
    }
    try{
      const tokendecode=jwt.verify(token,process.env.JWT_SECRETE)
      if(tokendecode.id){
        req.body.userId=tokendecode.id
      }else{
        return res.json({Success:false,message:'Invalid or expired token. Please login again.'})
      }
  next()
    }catch(error){
      res.json({Success:false,message:error.message})
    }
}
export default userAuth