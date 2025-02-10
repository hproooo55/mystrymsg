import {
    Html,
    Head,
    Font,
    Preview,
    Heading,
    Row,
    Section,
    Text,
    Button,
  } from '@react-email/components';
  
  interface VerificationEmailProps {
    username: string;
    otp: string;
  }
  
  export default function VerificationEmail({ username, otp }: VerificationEmailProps) {
    return `
    <html lang="en">
    <head>
        <title>Verification Code</title>
        <style>
            /* Add any necessary styles here */
            body {
                font-family: 'Roboto', Verdana, sans-serif;
                line-height: 1.6;
            }
            .otpwrap{
              background-color: green
              color:white;
              padding-x:8px;
              padding-y-6px;
            }
        </style>
    </head>
    <body>
        <h2>Hello ${username},</h2>
        <p>Thank you for registering. Please use the following verification code to complete your registration:</p>
        <div className='otpwrap'>
        <p className='otp'>${otp}</p>
        </div>
        <h3>Continue your registeration by clicking <a
        style={color:blue}
        href='${`https://mystrymsg-jade.vercel.app/verify/${username}`}'
        >
        Here
        </a></h3>
        <p>If you did not request this code, please ignore this email.</p>
    </body>
    </html>
  `;
  }