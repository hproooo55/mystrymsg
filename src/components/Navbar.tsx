'use client'
import { useSession, signOut } from 'next-auth/react'
import React from 'react'
import {User } from 'next-auth'
import { Button } from './ui/button'
import Link from 'next/link'

const Navbar = () => {
    const {data:session} = useSession()

    const user:User = session?.user as User
  return (
    <nav className='p-4 md:p-6 shadow-md items-center fixed flex w-full'> 
    <h1 className='text-black font-semibold'>Mystrymsg</h1>
        <div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
            <a href="#" className='text-xl font-bold mb-4 md:mb-0 '></a>
            {
                session?(
                    
                    <>
                    <span>
                    <a href="#" className='mr-4'>Welcome, {user.username || user.email}</a>
                    </span>
                    <Button onClick={()=> signOut()}>Logout</Button>
            </>
            ): (
                <Link href='/sign-in'>
                    <Button>Login</Button>
                </Link>
            )
            }
        </div>
    </nav>
  )
}

export default Navbar
