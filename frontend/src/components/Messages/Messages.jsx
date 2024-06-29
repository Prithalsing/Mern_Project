import React, { useEffect, useRef } from 'react'
import Message from './Message.jsx'
import useGetMessages from '../../hooks/useGetMessages.js'
import MessageSkeleton from '../skeleton/MessageSkeleton.jsx'
import useListenMessage from '../../hooks/useListenMessage.js'
const Messages = () => {

  const {messages, loading} = useGetMessages()
  useListenMessage()
  const lastMessageRef = useRef(null)

  useEffect(()=>{
    setTimeout(()=>{
      lastMessageRef.current?.scrollIntoView({behavior:"smooth"});
    }, 100)
  }, [messages])
  
  return (
    <div className='px-4 flex-1 overflow-auto'>

        {!loading && 
          messages.length > 0 && 
            messages.map((message)=>(
              <div key={message._id} ref = {lastMessageRef}>
                 <Message  message={message}/>
              </div> 
        )) }

        {loading && [...Array(3)].map((_, idx) =>(
           <MessageSkeleton key={idx} />
        ))}
        
        {!loading && messages.length ===0 && (
          <p className='text-center'> send a Message to start the conversation</p>
        )} 

    </div>
  )
}

export default Messages
