import { resend } from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";
import { ApiResponse } from "@/types/ApiResponse";
import nodemailer from 'nodemailer'


export async function sendVerificationEmail(
    email:string,
    username:string,
    verifyCode:string
): Promise<ApiResponse>{
    try{
            const transporter = nodemailer.createTransport({
                host: "smtp.gmail.com",
                port: 465,
                secure: true,
                auth: {
                    user: process.env.SMTP_USER,
                    pass: process.env.SMTP_PASS,
                },
            });

            const info = transporter.sendMail({
            from: process.env.SMTP_USER,
              to: email,
              subject: 'Mystery Message Verification Code',
              html: VerificationEmail({ username, otp: verifyCode }),
            })

        return {success:true, message:"Verification email sent successfully"}
    }catch(emailError){
        console.error("Error sending verification email", emailError)
        return{success:false, message:"Failed to send verification email"}
    }
}
