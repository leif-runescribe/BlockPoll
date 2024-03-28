import React from 'react'
import { Link, } from 'react-router-dom';

const Home = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center relative">
      
      <img
        src="/9.jpg"
        alt="Background"
        className=" opacity-30 absolute inset-0 w-full h-full object-cover"
      />
       <div className=' absolute top-5 right-10 text-3xl text-hover:bg-indigo-400'>
          <Link to='/admin'>Admin</Link>
        </div>
      
      <div className="bg-gray-800 bg-opacity-60 p-8 rounded-lg z-10 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">BLOCKPOLL Presidential Elections, <br/>2024</h1>
        <p className="text-white text-3xl mb-6">
          CAST YOUR VOTE AND BE HEARD<br/>
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-extrabold py-2 px-4 rounded">
          <Link to='/login'> Sign In</Link>
        </button>

        
      </div>
      <div className='mt-12 px-72 text-2xl font-extrabold text-center '>
          All Votes will be stored securely in the Blockchain, in a secure and transparent manner, for all to see and verify their choices, leading to a truly democratized and fair election
        </div>
    </div>
  );
};


export default Home