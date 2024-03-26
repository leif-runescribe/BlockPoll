import React, { useContext } from 'react';
import { Link } from 'react-router-dom';


const Voted = () => {
  
  
  
  return (
    <div className='h-screen flex flex-col justify-center items-center relative'>
      
      
      <div className="">
        <h1 className='text-black font-bold text-6xl'>Election</h1>
      </div>
      
      <div className=" p-8 px-20 bg-opacity-50 rounded-lg z-10 text-center">
      <h2 className="text-center text-4xl font-bold leading-9 tracking-tight text-black">IITM Speaker Election <br/> 2024</h2>
      
        <div className=' absolute top-5 text-3xl hover:text-indigo-400 right-10'>
         
        </div>

        <div className="sm:mx-auto sm:w-full border border-gray-400 sm:max-w-sm mt-20 bg-white ">
        <h2 className="text-white font-bold text-2xl px-32 py-8 w-full  bg-green-500 ">Voted succefully!</h2>
            </div>
     
      </div>
    </div>
  );
};

export default Voted;
