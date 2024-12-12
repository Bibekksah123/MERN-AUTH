import mongoose from "mongoose";
const userSchema=new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true,
    
  },
  verifyOtp:{
    type:String,
    default:''
  },
  verifyOptExp:{
    type:Number,
    default:0
  },
  isAccverify:{
    type:Boolean,
    default:false
  },
  resetOtp:{
    type:String,
    default:''
  },
 resetOtpExpr :{
    type:Number,
    default:0
  }
})
const userModel=mongoose.models.Auth||mongoose.model("Auth",userSchema)
export default userModel