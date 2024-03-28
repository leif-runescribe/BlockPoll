import axios from 'axios';
import React, { useContext } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';


const Login = () => {
  
  
  const {login} = useContext(UserContext)

  const navigate = useNavigate();
  const [roll, setroll] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(false);
  
  
  const handlelogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/login', {
        roll,
        password,
      });
      if(response.status===200){
        login(roll)
        
        const hasVoted = response.data.voter.hasVoted
        // console.log("hasVoted: ",hasVoted)
        if(hasVoted)
        
        navigate('/voted')
      else 
        navigate('/vote')
      }else
      alert()
    } catch (error) {
      alert("invalid details")
      
    }
  }
  return (
    <div className='h-screen flex flex-col justify-center items-center relative'>
      {error && alert("invalid login")}
      
      
      <div className="">
      <img
        src="/4.jpg"
        alt="Background"
        className=" opacity-20 absolute inset-0 w-full h-full object-cover"
      />
        <h1 className='text-white font-bold text-3xl'>BlockPOll</h1>
      </div>
      <div className=" p-8 px-20 bg-opacity-50 rounded-lg z-10 text-center">
      <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-black">BlockPoll President Elections<br/> 2024</h2>
        <div className=' absolute top-5 right-10 text-3xl text-hover:bg-indigo-400'>
          <Link to='/'>Home</Link>
        </div>

        <div className="sm:mx-auto sm:w-full border border-gray-400 sm:max-w-sm bg-white ">
        <h2 className="text-white font-bold text-2xl px-32 w-full  bg-green-500 p-4"> Voter <br/>Login</h2>
          
          
          <form className="space-y-6 mt-6 p-10" action="#" method="POST" onSubmit={handlelogin}>
            <div>
              <label htmlFor="roll" className="block text-xl font-medium leading-6 text-gray-900">Roll number</label>
              <div className="mt-2">
                <input  placeholder='roll no'
                  id="roll" 
                  name="roll" 
                  type="text" 
                  autoComplete="name" 
                  required 
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" 
                  onChange={(e) => { setroll(e.target.value); seterror(false); }} 
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
    </div>
  );
};

export default Login;
