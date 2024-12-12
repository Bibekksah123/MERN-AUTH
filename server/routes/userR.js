import express from 'express'
import userAuth from '../middleware/userAuth.js'
import userdetail from '../controllers/userAuths.js'
const userRouter=express.Router()
userRouter.get('/data',userAuth,userdetail)
export default userRouter