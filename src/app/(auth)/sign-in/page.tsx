'use client'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import React, { useState } from 'react'
import * as z from 'zod'
import { useToast } from '@/hooks/use-toast'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Loader2 } from 'lucide-react'
import { signInSchema } from '@/schemas/signInSchema'
import { signIn } from 'next-auth/react'




const Page = () => {
  
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {toast} = useToast()
  const router = useRouter()

const form = useForm<z.infer<typeof signInSchema>>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      identifier: '',
      password: ''
    }
  })

  const onSubmit = async (data: z.infer<typeof signInSchema>)=>{
    setIsSubmitting(true)
    const response = await signIn('credentials', {
      redirect:false,
      identifier: data.identifier,
      password: data.password
    })

    if(response?.error){
      toast({
        title: "Login failed",
        description: "Incorrect Username or Password",
        variant: 'destructive'
      })
      
      setIsSubmitting(false)
    }
    if(response?.url){
      router.replace('/dashboard')
      setIsSubmitting(false)
    }
    setIsSubmitting(false)
  }

  return (
    <div className='flex justify-center items-center min-h-screen bg-black'>
      <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-md'>
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 flex flex-col">
      <h2 className="scroll-m-20 pb-2 self-center text-3xl font-semibold tracking-tight first:mt-0">
      Welcome back! Sign In
    </h2>
        <FormField
          control={form.control}
          name="identifier"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email/Username</FormLabel>
              <FormControl>
                <Input type='text' className='bg-white text-black' placeholder="Email/Username" {...field} />
              </FormControl>
              <FormDescription className='text-xs'>
                Enter Your Username or Email
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type='password' placeholder="Password" {...field} />
              </FormControl>
              <FormDescription className='text-xs'>
                Enter Your Username or Email
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button variant={'default'} type="submit" disabled={isSubmitting}>
          {
            isSubmitting? (
          <>
          <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
          </>
         
        ): ('Sign In')
      } 
        </Button>
        <p className=' self-center '>Dont have an account?</p>
        <Button variant={'ghost'} className='bg-gray-50 hover:bg-gray-100' onClick={()=>{document.location.href='/sign-up'}} disabled={isSubmitting}>
          {
            isSubmitting? (
          <>
          <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
          </>
         
        ): ('Sign Up')
      } 
        </Button>
      </form>
    </Form>
      </div>
    </div>
  )
}

export default Page
