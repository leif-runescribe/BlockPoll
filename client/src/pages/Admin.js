//Page for Admin to connect a SheetDb url and initialize a voting
import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import AdminFunctions from '../components/AdminFunctions';

const Admin = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center relative">
      
      <img
        src="/4.jpg"
        alt="Background"
        className=" opacity-20 absolute inset-0 w-full h-full object-cover"
      />
      <div className='button rounded-full p-4 text-xl hover:text-indigo-400 text-black absolute top-5 right-10'>
            <Link to='/'>Home</Link>
        </div>
      <div className="bg-gray-100 bg-opacity-50 p-8 rounded-lg z-10 text-center flex flex-col">

      <AdminFunctions/>
      
      </div>
    </div>
  )
}

export default Admin