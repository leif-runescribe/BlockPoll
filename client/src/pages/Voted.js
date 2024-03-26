import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';


const Voted = () => {
  const navigate = useNavigate()
  useEffect(() => {
    
    const timer = setTimeout(() => {
      navigate('/');
    }, 3000);

    // Clean up the timer on component unmount
    return () => clearTimeout(timer);
  }, [navigate]);
  
  
  return (
    <div className='h-screen flex flex-col justify-center items-center relative'>
      
      
      <div className="">
        <h1 className='text-black font-bold text-6xl'>Election</h1>
      </div>
      
      <div className=" p-8 px-20 bg-opacity-50 rounded-lg z-10 text-center">
      <h2 className="text-center text-4xl font-bold leading-9 tracking-tight text-black">IITM Speaker Election <br/> 2024</h2>
      
        <div className=' absolute top-5 text-3xl hover:text-indigo-400 right-10'>
         
        </div>

        <div className=" border w-72 border-gray-400 sm:max-w-sm mt-20 bg-white ">
        <h2 className="text-white font-bold text-2xl px-6 py-8 w-full flex  bg-green-500 ">You have already voted succefully!</h2>
        <h1 className='py-10'>Redirecting to Homepage...</h1>
            </div>
     
      </div>
    </div>
  );
};

export default Voted;
