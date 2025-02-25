import mongoose, {Schema, Document} from "mongoose";

export interface Message extends Document{
    _id:string,
    content: string,
    createdAt:Date
}

const MessageSchema:Schema<Message> = new Schema({
    content:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        required:true,
        default:Date.now
    }
}, 
)


export interface User extends Document {
  email: string;
  password: string;
  isVerified: boolean;
  isAcceptingMessages: boolean;
  username: string;
}

export interface User extends Document{
    _id:string
    username:string,
    email:string,
    password:string,
    verifyCode:string,
    verifyCodeExpiry:Date,
    image?: string;
    name?: string; // Add the name property
    isVerified:boolean,
    isAcceptingMessage:boolean,
    messages:Message[]
}

const UserSchema:Schema<User> = new Schema({
    username:{
        type:String,
        required:[true, 'Username is required'],
        trim:true,
        unique:true
    },
    email:{
        type:String,
        required:[true, 'Email is required'],
        trim:true,
        unique:true,
        match:[/\b[\w\.-]+@[\w\.-]+\.\w{2,4}\b/gi, 'please provide a valid email address']
        
    },
    password:{
        type:String,
        required:[true, "Password is required"]
    },
    verifyCode:{
        type:String,
        required:[true, "Verifycode is required"]
    },
    verifyCodeExpiry:{
        type:Date,
        required:[true, "Verifycode expiry is required"]
    },
    isVerified:{
        type:Boolean,
        default:false
    }, 
    isAcceptingMessage:{
        type:Boolean,
        default:true
    }, 
    messages:[MessageSchema]
})

const UserModel = (mongoose.models.User as mongoose.Model<User>) || mongoose.model<User>('User', UserSchema)

export default UserModel