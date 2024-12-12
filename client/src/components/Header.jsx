import React from 'react'
import { assets } from '../assets/assets'

function Header() {
  return (
    <div className='flex flex-col items-center mt-20 px-4 text-center'>
      <img src={assets.header_img} className='w-36 h-36 rounded-full mb-6' alt="" />
      <h1 className='flex items-center gap-2 sm:text-3xl text-xl font-medium mb-2'>Hey Developer <img src={assets.hand_wave} className='w-8 aspect-square' alt="" /></h1>
      <h2 className='text-3xl sm:text-xl font-serif mb-2'>Welcome To App</h2>
      <p className='mb-6 max-w-md text-sm'>Engaging in a real chat with a robot offers an immersive, dynamic experience. AI-powered robots understand context, answer questions, and adapt responses, providing seamless communication. This interaction blends human-like conversation with efficiency, enhancing support, entertainment, and productivity across various industries.</p>
      <button className='border border-gray-500 rounded-full px-6 py-2 text-gray-900 hover:bg-gray-100 transition-all'>Get Started</button>
    </div>
  )
}

export default Header