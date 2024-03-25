import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center relative">
      
     
      <div className='button rounded-full p-4 text-xl bg-indigo-400 text-white absolute top-5 right-10'>
            <Link to='/adminlogin'>Admin</Link>
        </div>
      <div className="bg-gray-800 bg-opacity-50 p-8 rounded-lg z-10 text-center">
        <h1 className="text-3xl font-bold text-white mb-4">IITM SLC Speaker's Election, <br/>2024</h1>
        <p className="text-white text-2xl mb-6">
          Cast your vote <br/>
        </p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <Link to='/login'> Sign In</Link>
        </button>
      </div>
    </div>
  );
};


export default Home