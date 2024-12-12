import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import userModel from '../model/userModel.js';
import trasporter from '../confi/nodemailer.js';
export const register=async(req,res)=>{
  const {name,email,password}=req.body;
  if(!name||!email||!password){
   return  res.status(400).json({Success:false,message:'Missing details'})
  }
  try{
    const existUser=await userModel.findOne({email})
    if(existUser){
     return res.json({Success:false,message:'User Already exists'})
    }
  const hashPass=await bcrypt.hash(password,10)
  const user=new userModel({name,email,password:hashPass})
  await user.save()
  const token=jwt.sign({id:user._id},process.env.JWT_SECRETE,{ expiresIn:'7d'})
  res.cookie('token',token,{
    httpOnly:true,
    secure:process.env.NODE_ENV==='production',
    sameSite:process.env.NODE_ENV==='production'?'none':'strict',
    maxAge:7*24*60*60*1000
  })
  const mailerOption={
    from:process.env.SENDER_MAIL,
    to:email,
    subject:'Welcome To Kathmandau',
    text:"how are you?"
  }
  await trasporter.sendMail(mailerOption)
  return res.json({Success:true})

  }catch(error){
    res.json({Success:false,message:error.message})
  }

}
//login
export const login=async(req,res)=>{
  const {email,password}=req.body;
  if(!email||!password){
    return  res.status(400).json({Success:false,message:'Missing details'})
   }
   try{
  const user=await userModel.findOne({email})
  if(!user){
    return  res.status(400).json({Success:false,message:'email invalid'})
  }
  const ismatch=await bcrypt.compare(password,user.password)
  if(!ismatch){
    return  res.status(400).json({Success:false,message:'password invalid'})
  }
  const token=jwt.sign({id:user._id},process.env.JWT_SECRETE,{ expiresIn:'7d'})
  res.cookie('token',token,{
    httpOnly:true,
    secure:process.env.NODE_ENV==='production',
    sameSite:process.env.NODE_ENV==='production'?'none':'strict',
    maxAge:7*24*60*60*1000
  })
 return res.json({Success:true})

}catch(error){
  res.json({Success:false,message:error.message})
}
  
}
//logout
export const logout=async(req,res)=>{

  try{
    res.clearCookie('token',{
      httpOnly:true,
      secure:process.env.NODE_ENV==='production',
      sameSite:process.env.NODE_ENV==='production'?'none':'strict',
      maxAge:7*24*60*60*1000
    })
  return res.json({Success:true,message:'logged out'})
  }
  catch(error){
    res.json({Success:false,message:error.message})
  }
}
//otp send
export const sendVerOtp=async(req,res)=>{
  try{
   const {userId}=req.body
   const user =await userModel.findOne(userId)
   if(user.isAccverify){
    res.json({Success:false,message:'Account Already Verify'})
   }
   const otp=String(Math.floor(1000+Math.random()*90000))
   user.verifyOtp=otp;
   user.verifyOptExp=Date.now()+24*60*60*1000
   await user.save()
   const mailerOption={
    from:process.env.SENDER_MAIL,
    to:user.email,
    subject:'otp',
    text:`Your verificatio otp is :${otp}`
  }
  await trasporter.sendMail(mailerOption)
  return res.json({Success:true,message:'verification otp is sended to your mail'})
  }catch(error){
    res.json({Success:false,message:error.message})
  }

}
//otp send verification otp
export const verifyemail=async(req,res)=>{
  const{userId,otp}=req.body
  if(!userId || !otp){
   res.json({Success:false,message:'Missing Details'})
  }
  try{
  const user=await userModel.findOne(userId)
  if(!user){
    res.json({Success:false,message:'User Not Found'})
  }
  if(user.verifyOtp=='' || user.verifyOtp !==otp){
    return res.json({Success:false,message:'Invalid OTP'})
  }
  if(user.verifyOptExp<Date.now()){
    return res.json({Success:false,message:'OTP Expired'})
  }
  user.isAccverify=true
  user.verifyOtp=''
  user.verifyOptExp=0
  await user.save()
  return res.json({Success:true,message:'Account verify successful'})
  }catch(error){
    res.json({Success:false,message:error.message})
  }
}
//check the user
export const islogin=async(req,res)=>{
  try{
    return res.json({Success:true})

  }catch(error){
    res.json({Success:false,message:error.message})
  }

}
//resend otp
export const resetOtp=async(req,res)=>{
  try{
   const {email}=req.body
   const user =await userModel.findOne(email)
   if(!user){
    res.json({Success:false,message:'user not found'})
   }
   const otp=String(Math.floor(1000+Math.random()*90000))
   user. resetOtp=otp;
   user.resetOtpExpr=Date.now()+24*60*60*1000
   await user.save()
   const mailerOption={
    from:process.env.SENDER_MAIL,
    to:user.email,
    subject:'otp',
    text:`Your reset otp is :${otp}`
  }
  await trasporter.sendMail(mailerOption)
  return res.json({Success:true,message:'otp is sended to your mail'})
  }catch(error){
    res.json({Success:false,message:error.message})
  }

}
//resend otp check
export const resetotpverify=async(req,res)=>{
  const{email,otp,newpassword}=req.body
  if(!userId || !otp||newpassword){
   res.json({Success:false,message:'Missing Details'})
  }
  try{
  const user=await userModel.findOne(email)
  if(!user){
    res.json({Success:false,message:'User Not Found'})
  }
  if(user.verifyOtp=='' || user.verifyOtp !==otp){
    return res.json({Success:false,message:'Invalid OTP'})
  }
  if(user.resetOtpExpr<Date.now()){
    return res.json({Success:false,message:'OTP Expired'})
  }
  const newhashpass=await bcrypt.hash(newpassword,10)
user.password=newhashpass
  user.  resetOtp=''
  user.resetOtpExpr=0
  await user.save()
  return res.json({Success:true,message:'Account verify successful'})
  }catch(error){
    res.json({Success:false,message:error.message})
  }
}