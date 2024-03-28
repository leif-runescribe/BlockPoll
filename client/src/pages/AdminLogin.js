import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import AdminFunctions from '../components/AdminFunctions'



const AdminLogin = () => {
    const navigate = useNavigate()
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(false)
  const [auth, setAauth] = useState(false)
  

  const handlelogin = async(e) => {
    e.preventDefault();

    const adminName = "admin"
    const adminPass = "pass"

    if(username === adminName && password===adminPass){
        setAauth(true)
    }
    else
    seterror(true)
    }
  
  return (
    <>
    {auth?(
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
    ):
    (
    <div className='h-screen flex flex-col justify-center items-center relative'>
      {error && alert("invalid login")}
      
      <div className="">
        <h1 className='text-white font-bold text-3xl'>Election</h1>
      </div>
      
      <div className=" p-8 px-20 bg-opacity-50 rounded-lg z-10 text-center">
      <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-black">BLOCKPOLL Election <br/> 2024</h2>
        <div className=' absolute top-5 right-10 text-3xl hover:bg-indigo-400'>
          <Link to='/'>Home</Link>
        </div>

        <div className="sm:mx-auto sm:w-full border border-gray-400 sm:max-w-sm bg-white ">
        <h2 className="text-white font-bold text-2xl px-32 w-full  bg-green-500 ">Admin Login</h2>
          
          
          <form className="space-y-6 mt-6 p-10" action="#" method="POST" onSubmit={handlelogin}>
            <div>
              <label htmlFor="email" className="block text-xl font-medium leading-6 text-gray-900">Admin Username</label>
              <div className="mt-2">
                <input  placeholder='Admin username'
                  id="username" 
                  name="roll" 
                  type="text" 
                  autoComplete="name" 
                  required 
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                  onChange={(e) => { setusername(e.target.value); seterror(false); }} 
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-xl font-medium leading-6 text-gray-900">Password</label>
              <div className="mt-2">
                <input 
                placeholder="password"
                  id="password" 
                  name="password" 
                  type="password" 
                  autoComplete="current-password" 
                  required 
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                  onChange={(e) => { setpassword(e.target.value); seterror(false); }} 
                />
              </div>
            </div>

            <div className='pb-5 items-center flex justify-center'> 
              <button 
                type="submit" 
                className="flex w-32 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>)}
    </>
  );
  }

export default AdminLogin