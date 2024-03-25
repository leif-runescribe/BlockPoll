import axios from 'axios';
import React, { useContext, useEffect } from 'react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/UserContext';


const Login = () => {

  const [isLoading, setIsLoading] = useState(false)
  const {login} = useContext(UserContext)
  const [data, setData] = useState([]);
  const [auth, setAuth] = useState('')
  const [hasVoted, setHasVoted] = useState('')
  const navigate = useNavigate();
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, seterror] = useState(false);
  const baseUrl = "https://script.googleusercontent.com/macros/echo?user_content_key=ofFK17wrkJfacdg7eTc0tuAruV38gGNmp7NhzgxCR_oXCELOHztu9mFGMD889sFBWs-QTZEeOlL6SV-8N3CXtitnUq2uRUMIm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnDZ-pZX00ZKBI428wQ2Hg5ZsmKetN_xqDPsjuwMpPcYaXU8PqSZ5WkR6fHkufY9GFk-mSSxAiVIk6eIfu7Fy8fIDWLWcugu_d9z9Jw9Md8uu&lib=M7LzteUcszfmPeP7Gsk1aHuqtzmrVi1th"
  
  useEffect(() => {
    setIsLoading(true)
    const fetchData = async () => {
     
      try{
        const response = await fetch(baseUrl);
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.status}`);
        }

        const fetchedData = await response.json();
        const data = Object.values(fetchedData);
        
        setData(data);       
      } catch (error) {
        
      }finally{
        setIsLoading(false)
      }
    };

    fetchData();
  }, []); 

  const handlelogin = (e) => {
    e.preventDefault();  
      const authRes = authenticate(email,password)
      if(authRes.user){
        login(email)  
        navigate('/vote')
      }
   else{
      console.log('Login error: Not valid',);
      seterror(true);
    }
  };

  const authenticate = (roll, psw) => {
    // return !!data.find(user => user.roll.toString() === roll && user.psw.toString() === psw);
    const foundUser = data.find(user => user.roll.toString() === roll && user.psw.toString() === psw); 
  if (foundUser) {
    login(foundUser)
    return {    
      user: foundUser, // Include the entire user object
    };
  } else {
    login(null)
    return {
      user:null
    };
  }
}
  return (
    <div className='h-screen flex flex-col justify-center items-center relative'>
      {error && alert("invalid login")}
      
      <div className="">
        <h1 className='text-white font-bold text-3xl'>Election</h1>
      </div>
      {isLoading&& <div className='mt-40 text-4xl'>A minute please...
        <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-black"
        role="status">
        <span
        className="!absolute text-b !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        ></span>
        </div></div>}
      
      <div className=" p-8 px-20 bg-opacity-50 rounded-lg z-10 text-center">
      <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-black">IITM Speaker Election <br/> 2024</h2>
        <div className=' absolute top-5 right-10 text-3xl text-hover:bg-indigo-400'>
          <Link to='/'>Home</Link>
        </div>

        <div className="sm:mx-auto sm:w-full border border-gray-400 sm:max-w-sm bg-white ">
        <h2 className="text-white font-bold text-2xl px-32 w-full  bg-green-500 ">Student Login</h2>
          
          
          <form className="space-y-6 mt-6 p-10" action="#" method="POST" onSubmit={handlelogin}>
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
                  onChange={(e) => { setemail(e.target.value); seterror(false); }} 
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
