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
            port: 465,
            host: "smtp.gmail.com",
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS,
            },
            secure: true,
        });
        
        await new Promise((resolve, reject) => {
            // verify connection configuration
            transporter.verify(function (error, success) {
                if (error) {
                    console.error(error)
                    reject(error);
                } else {
                    resolve(success);
                }
            });
        });
        
        const mailData = {
            from: process.env.SMTP_USER,
            to: email,
            subject: `Mystrymsg Verification Code`,
            html: VerificationEmail({ username, otp:verifyCode }),
        };
        
        await new Promise((resolve, reject) => {
            // send mail
            transporter.sendMail(mailData, (err, info) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    resolve(info);
                }
            });
        });
        

        return {success:true, message:"Verification email sent successfully"}
    }catch(emailError){
        console.error("Error sending verification email", emailError)
        return{success:false, message:"Failed to send verification email"}
    }
}
