'use client';
import { useSession, signOut } from 'next-auth/react';
import React from 'react';
import { User } from 'next-auth';
import { Button } from './ui/button';
import Link from 'next/link';

const Navbar = () => {
  const { data: session } = useSession();

  const user: User = session?.user as User;
  return (
    <nav className='p-4 md:p-6 shadow-md items-center fixed flex w-full bg-black h-16 z-20'>
      <div className='container mx-auto flex md:flex-row flex-row justify-between items-center'>
        <h1 className='text-white font-semibold'>Mystrymsg</h1>
        <a href="#" className='text-xl font-bold mb-4 '></a>
        {session ? (
          <>
            <span>
              <a href="#" className='mr-4 text-white'>Welcome, {user.username || user.email}</a>
            </span>
            <Button onClick={() => signOut()}>Logout</Button>
          </>
        ) : (
          <Link href='/sign-in'>
            <Button>Login</Button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;