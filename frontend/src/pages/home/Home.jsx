import React from 'react'
import Sidebar from '../../components/Sidebar/Sidebar.jsx'
import MessageContainer from '../../components/Messages/MessageContainer.jsx'
const Home = () => {
  return (
    <div className='flex sm:h-[450px] md:h-[550px] rouded-lg overflow-hidden bg-gray-400 bg-clip-padding 
    backdrop-fliter backdrop-blur-lg bg-opacity-0'>
      
      <Sidebar/>
      <MessageContainer/> 
    </div>
  )
}

export default Home
