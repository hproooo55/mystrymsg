'use client'
import { useToast } from '@/hooks/use-toast'
import { verifySchema } from '@/schemas/verifySchema'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'
import {useForm } from 'react-hook-form'
import axios, { AxiosError } from 'axios'
import { ApiResponse } from '@/types/ApiResponse'
import { FormControl, Form, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from '@/components/ui/input-otp'
import { useDebounceCallback } from 'usehooks-ts'

const VerifyAccount = () => {
  const router = useRouter()
  const params = useParams<{username:string}>()  
  const {toast} = useToast()
  const [otp, setotp] = useState('')
  const debouncedOTP = useDebounceCallback(setotp, 300)
  const form = useForm<z.infer<typeof verifySchema>>({
      resolver: zodResolver(verifySchema),
      
    }
)
const onSubmit = async(data: z.infer<typeof verifySchema>)=>{
    try {
        console.log(otp)
        const response = await axios.post(`/api/verify-code`, {
            username: params.username,
            code: otp
        })
        toast({
                title: "Success",
                description: response.data.message
        })
        
    } catch (error) {
        const axiosError = error as AxiosError<ApiResponse>
        toast({
            title: "Sign Up failed",
            description: axiosError.response?.data.message,
        })

    }
}
  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-900'>
      <div className='w-full max-w-md p-8 space-y-6 bg-gray-100 rounded-lg text-black shadow-md'>
        <div className='text-center'>
            <h1 className='text-4xl font-extrabold font-mono tracking-tight lg:text-5xl mb-6'>Verify Your Account</h1>
            <p className='mb-4'>Enter Verification code sent to your email</p>
        </div>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-7 flex flex-col items-center text-center">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Verification Code</FormLabel>
              <FormControl>
            <InputOTP onChange={(value:string)=>{
                  field.onChange(value)
                  debouncedOTP(value)
                }} maxLength={6}>
            <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />

            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
            </InputOTPGroup>
                
            </InputOTP>
              </FormControl>
              <FormDescription>
                Enter the code that was sent to your email
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className=' w-full' type="submit">Submit</Button>
      </form>
    </Form>
      </div>
    </div>
)
}

export default VerifyAccount
