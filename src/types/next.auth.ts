import 'next-auth'
import { DefaultSession } from 'next-auth'

declare module 'next-auth' {
    interface User {
        _id?:String,
        isVerified?:Boolean,
        isAcceptingMessages?:boolean,
        username?:String
    }

    interface Session {
        user: {
            _id?: String,
            isVerified?:Boolean,
            isAcceptingMessages?:boolean,
            username?:String
        } & DefaultSession['user']
    }
}

declare module "next-auth/jwt"{
    interface JWT {
        id?:String,
        isVerified?:Boolean,
        isAcceptingMessages?:boolean,
        username?:String
    }
}