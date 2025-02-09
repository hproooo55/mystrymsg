'use client'
import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import Autoplay from 'embla-carousel-autoplay'
import messages from '@/messages.json'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

const Home = () => {
  return (
    <main className=' flex-grow flex flex-col items-center justify-center px-4 py-28 '>
      <section className='tracking-wide text-2xl mb-8 flex mt-8 flex-col items-center relative '></section>
        <h1 className='text-5xl text-black md-text-5xl mb-5 font-bold w-58 text-center'>Dive Into The World of Anonymus Conversations</h1>
        <p className='text-blue-500 text-center'>Explore Mystery Message - Where your indentity remains a secret</p>
      <Carousel plugins={[Autoplay({delay:2000})]} className='scale-95 px-5 max-[768px]:scale-75 max-[480px]:scale-[.6] mt-5'>
      <CarouselContent>
        {
          messages.map((message, index)=>(
            <CarouselItem key={index}>
              <div className='p-1'>
                <Card className='max-[768px]:w-[600px]'>
                  <CardHeader>{message.title}</CardHeader>
                  <CardContent className='flex items-center justify-center'>
                    <span className='text-4xl font-semibold'>
                      {message.content}
                    </span>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))
        }
      </CarouselContent>
</Carousel>

    </main>
  )
}

export default Home
