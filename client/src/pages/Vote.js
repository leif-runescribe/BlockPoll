import React, { useState, useEffect, useContext } from 'react';

import Grid from '../components/Grid';
import { Link } from 'react-router-dom';
import { UserContext } from '../context/UserContext';




const Admin = () => {
  const {user} = useContext(UserContext)
  const [data, setData] = useState(""); 
  const [isLoading, setIsLoading] = useState(false);
  

  
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      
      try{
        const response = await fetch("https://script.google.com/macros/s/AKfycbyBRLxlZDbX9NslbJlAiHAtPnGhGGWppF5-Mffdo-DIngitfVyxtgheg8oYMill7Yvs/exec");
        if (!response.ok) {
          throw new Error(`Error fetching data: ${response.status}`);
        }

        const fetchedData = await response.json();
        const data = Object.values(fetchedData);

        setData(data); 
        
      } catch (error) {
        console.error(error.message);
      }finally{
        setIsLoading(false)
      }
    };

    fetchData();
  }, []); 

  const handleSubmit=(e)=>{
    e.preventdefault()
    

  }

  return (
    <div>
      <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50 flex items-center justify-between p-8">
      <h1 className="text-3xl md:text-5xl font-bold">IITM SLC Speaker's Election, 2024</h1>
      
      <h1 className='text-2xl'>Voter info: {user? user: "info"}</h1>
      <Link to="/" className="text-blue-500 hover:underline">Home</Link>
    </nav>
    <div className='min-h-screen bg-gray-100 px-20 max-w-full '>
      <button type="submit" className="..."></button>
      {isLoading&& <div className='mt-40 text-4xl'>Loading...
        <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-black"
        role="status">
        <span
        className="!absolute text-b !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        ></span>
        </div></div>}
      {data.length > 0 && ( 
        <div>
     
        <Grid data={data}/>
       
        
        </div>
      )}
      
    </div>
    </div>
  );}
         

export default Admin;
