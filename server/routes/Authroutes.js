import express from 'express'
import { islogin, login, logout, register, resetOtp, resetotpverify, sendVerOtp, verifyemail } from '../controllers/authController.js'
import userAuth from '../middleware/userAuth.js'
const Authroutes=express.Router()
Authroutes.post('/register',register)
Authroutes.post('/login',login)
Authroutes.post('/logout',logout)
Authroutes.post('/send-verify-otp',userAuth,sendVerOtp)
Authroutes.post('/verify-account',userAuth,verifyemail)
Authroutes.post('/isuser?',userAuth,islogin)
Authroutes.post('/resetpass',userAuth,resetOtp)
Authroutes.post('/resetpasssucess',userAuth,resetotpverify)

export default Authroutes