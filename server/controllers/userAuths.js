import userModel from "../model/userModel.js";
const userdetail=async(req,res)=>{
  try{
  const {userId}=req.body;
  const user =await userModel.findOne(userId)
  if(!user){
    res.json({Success:false,message:'user not found'})
  }
  res.json({
   Success:true,
    userDaata:{
      name:user.name,
      isaccverify:user.isaccverify
    }
  })
}catch(error){
    res.json({Success:false,message:error.message})
  }

}
export default userdetail