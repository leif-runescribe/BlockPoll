import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Register = () => {

  const [roll, setRoll] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/register', {
        roll,
        password,
      });

    } catch (error) {
      console.error('Error registering:', error);
    }
  };
  
  const [error, seterror] = useState(false);
 
  
  return (
    <div className='h-screen flex flex-col justify-center items-center relative'>
      {error && alert("didnt register")}
      
      
      <div className="">
        <h1 className='text-white font-bold text-3xl'>Election</h1>
      </div>
      <div className=" p-8 px-20 bg-opacity-50 rounded-lg z-10 text-center">
      <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-black">IITM Speaker Election <br/> 2024</h2>
        <div className=' absolute top-5 right-10 text-3xl text-hover:bg-indigo-400'>
          <Link to='/'>Home</Link>
        </div>

        <div className="sm:mx-auto sm:w-full border border-gray-400 sm:max-w-sm bg-white ">
        <h2 className="text-white font-bold text-2xl px-32 w-full  bg-green-500 ">Student Register</h2>
          
          
          <form className="space-y-6 mt-6 p-10" action="#" method="POST" onSubmit={handleRegister}>
            <div>
              <label htmlFor="email" className="block text-xl font-medium leading-6 text-gray-900">Roll number</label>
              <div className="mt-2">
                <input  placeholder='roll no'
                  id="email" 
                  name="roll" 
                  type="text" 
                  autoComplete="name" 
                  required 
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                  onChange={(e) => { setRoll(e.target.value); seterror(false); }} 
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
                  onChange={(e) => { setPassword(e.target.value); seterror(false); }} 
                />
              </div>
            </div>

            <div className='pb-5 items-center flex justify-center'> 
              <button 
                type="submit" 
                className="flex w-32 justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
