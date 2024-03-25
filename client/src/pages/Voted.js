import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const Voted = () => {
  
  const {user,logout} = useContext(UserContext)
  const handleLogout=()=>{
    logout()
  }
  return (
    <div className='h-screen flex flex-col justify-center items-center relative'>
      
      
      <div className="">
        <h1 className='text-black font-bold text-3xl'>Election</h1>
      </div>
      
      <div className=" p-8 px-20 bg-opacity-50 rounded-lg z-10 text-center">
      <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-black">IITM Speaker Election <br/> 2024</h2>
      {user?
      <button onClick={handleLogout} className=' absolute top-5  text-3xl hover:text-indigo-400 right-40'>
          Logout from {user}
        </button>
        :
        <div className=' absolute top-5  text-3xl hover:text-indigo-400 right-40'>
        Logged out successfully
      </div>
        }
        <div className=' absolute top-5 text-3xl hover:text-indigo-400 right-10'>
          <Link to='/'>Home</Link>
        </div>

        <div className="sm:mx-auto sm:w-full border border-gray-400 sm:max-w-sm bg-white ">
        <h2 className="text-white font-bold text-2xl px-32 w-full  bg-green-500 ">Voted succefully!</h2>
          
          
         
            
            
            </div>
     
      </div>
    </div>
  );
};

export default Voted;
