import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Results = () => {

  
  const [candidateData, setCandidateData] = useState(""); 
  const [voteData, setVoteData] = useState([]); 
 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false)
 

  // const fetchData = async () => {
  //   setIsLoading(true) 
  //   try{
  //     const response = await fetch("https://script.google.com/macros/s/AKfycbyBRLxlZDbX9NslbJlAiHAtPnGhGGWppF5-Mffdo-DIngitfVyxtgheg8oYMill7Yvs/exec");  
  //     if (!response.ok) {
  //       throw new Error(`Error fetching data: ${response.status}`);
  //     }
  //     const fetchedData = await response.json();
  //     const data = Object.values(fetchedData);
  //     setCandidateData(data); 
  //     console.log(candidateData)
  //   } catch (error) {
  //     console.error(error.message);
  //   }finally{
  //     setIsLoading(prevLoading => (prevLoading && !voteData) || false);
  //   }
  // };

  const fetchVotes= async () => {
    setIsLoading(true)
    try {
      const response = await axios.post('http://localhost:3001/poll-votes');
      const data = await response.data.data
      setVoteData(data); 
      
    
    } catch (error) {
      console.log(error.message);
    } finally{
      setIsLoading(false); 
    }
    }
    
  useEffect(()=>{
    
    fetchVotes()
  }, [])


  return (
    <>
      {isLoading ? (<div className='mt-40 text-4xl flex justify-center items-center'>Fetching results...
        <div
        className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-black"
        role="status">
        <span
        className="!absolute text-b !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
        ></span>
        </div></div>):
        <>
         <div className="flex mt-40 justify-center items-center">
          <h1 className='absolute text-center top-10 py-10 text-3xl text-black'>Poll Results</h1>
  <table className="table-auto border border-black">
    <thead>
      <tr>
        <th className="px-4 py-2 text-left border border-black">Candidate 1</th>
        <th className="px-4 py-2 text-left border border-black">Candidate 2</th>
        <th className="px-4 py-2 text-left border border-black">Candidate 3</th>
        <th className="px-4 py-2 text-left border border-black">Candidate 4</th>
      </tr>
    </thead>
    <tbody>
      {Array.isArray(voteData)&&voteData?.map((item, rowIndex) => {
        // Splitting the string into individual digits
        const digits = item.split('');

        // Rendering each digit in a separate column
        return (
          <tr cclassName="border border-black" key={rowIndex}>
            {digits.map((digit, columnIndex) => (
              <td className="px-4 py-2 border-r border-black" key={columnIndex}>{digit}</td>
            ))}
          </tr>
        );
      })}
    </tbody>
  </table>
</div> 
        </>
        }
    
  </>
  );
};

export default Results;