import React from 'react'
import { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import registerUser from '../Api/Api'
import axios from 'axios'



const Register = () => {
    const navigate = useNavigate()
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [username, setusername] = useState("");

  const handleRegister = async(e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/register', {
        username,
        email,
        password,
      });
  
      navigate('/vote')
      console.log('Registration successful:', response.data);
      localStorage.setItem('jwtToken', response.data.token);

  
      return response.data;
      
    } catch (error) {
      
      console.error('Registration nahi hua:', error.response.data);
      throw error;
    }
  }
  return (
    <div className=' <div className="h-screen flex flex-col justify-center items-center relative">'>
    <img
        src="/5.jpg"
        alt="Background"
        className=" opacity-50 absolute inset-0 w-full h-full object-cover"
      />
    <div className="mt-40 p-8 px-20 bg-gray-600 bg-opacity-50 p-8 rounded-lg z-10 text-center">
   
    <div className=' absolute top-5 right-10'>
            <Link to='/'>Home</Link>
        </div>
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-black">Register to your Account</h2>
    </div>
  
    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form className="space-y-6" action="#" method="POST" onSubmit = {handleRegister}>
  
      
        <div>
          <label for="email" className="block text-sm font-medium leading-6 text-gray-900">Email address</label>
          <div className="mt-2">
            <input id="email" name="email" type="email" autocomplete="email" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={(e)=> setemail(e.target.value)}/>
          </div>
        </div>

        <div>
          <label for="username" className="block text-sm font-medium leading-6 text-gray-900">Username</label>
          <div className="mt-2">
            <input id="username" name="username" type="username" autocomplete="username" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={(e)=> setusername(e.target.value)}/>
          </div>
        </div>
  
        <div>
          <div className="flex items-center justify-between">
            <label for="password" className="block text-sm font-medium leading-6 text-gray-900">Password</label>
            <div className="text-sm">
              <a href="#" className="font-semibold text-white hover:text-indigo-500">Forgot password?</a>
            </div>
          </div>
          <div className="mt-2">
            <input id="password" name="password" type="password" autocomplete="current-password" required className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={(e)=> setpassword(e.target.value)}/>
          </div>
        </div>
  
        <div>
          <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Register</button>
        </div>
      </form>
  
      <p className="mt-10 text-center text-sm text-white">
      Already signed up?
        <a href="#" className="font-semibold leading-6 text-black-600 hover:text-indigo-500"> <Link to = "/login">Login</Link></a>
      </p>
    </div>
  </div>
  </div>
  )
}

export default Register