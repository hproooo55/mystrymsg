'use client'
import React from 'react'
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from './ui/button'
import { Message } from '@/model/user.model'
import { useToast } from '@/hooks/use-toast'
import { ApiResponse } from '@/types/ApiResponse'
import axios from 'axios'
import moment from 'moment'

type MessageCardProps = {
  message: Message,
  onMessageDelete: (messageId: string) => void
}

const MessageCard = ({message, onMessageDelete}:MessageCardProps) => {
  const {toast} = useToast()
  const handleDeleteConfirm = async() => {
    const response = await axios.post<ApiResponse>(`/api/delete-message/${message._id}`)
    toast({
      title: response.data.message
    })
    onMessageDelete(message._id as string)
  }
  return (
    <>
    <Card>
      {/* <CardHeader> */}
      {/* </CardHeader> */}
      <CardContent className='mt-6'>
        <p>{message.content}</p>
      </CardContent>
      <CardFooter className='flex justify-between'>
        <p className='text-gray-400 font-medium'>{moment(message.createdAt).calendar()}</p>
        <AlertDialog>
          <AlertDialogTrigger>
          <Button variant={'destructive'}>
              Delete
            </Button>
            </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your account
                and remove your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={()=>{
                handleDeleteConfirm()
              }} >Continue</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        
      </CardFooter>
    </Card>
    </>

  )
}

export default MessageCard
