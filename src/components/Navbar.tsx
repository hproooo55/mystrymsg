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
    <nav className='p-4 shadow-md items-center fixed bg-white flex w-screen'> 
        <div className='w-full flex  justify-between items-center'>
            <a href="#" className='text-xl font-bold md:mb-0 '>Mystrymsg</a>
            {
                session?(
                    
                    <>
                    <span>
                    <a href="#" className=' text-black text-center'>Welcome, {user.username || user.email}</a>
                    </span>
                    <Button onClick={()=> signOut()}>Logout</Button>
            </>
            ): (
                <>
                    <span>
                    <a href="#" className=' text-black flex text-center'>Welcome, Please Login</a>
                    </span>
                <Link href='/sign-in' >
                    <Button >Login</Button>
                </Link>
                </>
            )
            }
        </div>
    </nav>
  )
}

export default Navbar
