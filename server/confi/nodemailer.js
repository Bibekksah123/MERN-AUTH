import nodemailer from 'nodemailer'
const trasporter=nodemailer.createTransport({
  host:'smtp-relay.brevo.com',
  port:587,
  secure:false,
  auth:{
    user:process.env.SMPT_USER,
    pass:process.env.SMPT_PASS,
  }

})
export default trasporter