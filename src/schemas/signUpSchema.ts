import {z} from "zod"

export const userNameValidation = z
    .string()
    .min(2, 'Username must be atleast 2 characters long')
    .max(15, "Username must be no more than 15 characters")
    .regex(/^[a-zA-Z0-9_-]+$/, "Username must not contain special characters")

export const signUpSchema = z.object({
    username:userNameValidation,
    email: z.string().email({message: 'Invalid email address'}),
    password: z.string().min(6, {message:"Password must be atleast 6 characters"})
    
})