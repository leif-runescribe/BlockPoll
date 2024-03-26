import React, { useEffect, useState } from 'react';

const Results = () => {

  
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
        const d = Object.values(fetchedData);
        
        setData(d);
        console.log(data) 
        
      } catch (error) {
        console.error(error.message);
      }finally{
        setIsLoading(false)
      }
    };

    fetchData();
  }, []); 

    const arr = ["132", "213", "321", "123", "231", "312"];
  return (
    <div className="flex justify-center">
    <table className="table-auto border-collapse border border-gray-400">
      <thead>
        
        <tr>
        {data.map((item)=>(
          
          <th className="px-4 py-2 border border-gray-400">{item.name}</th>
        ))}
          </tr>
      </thead>
      <tbody>
        {arr.map((value, index) => (
          <tr key={index}>
            
            <td className="px-4 py-2 border border-gray-400">{value[0]}</td>
            <td className="px-4 py-2 border border-gray-400">{value[1]}</td>
            <td className="px-4 py-2 border border-gray-400">{value[2]}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  );
};

export default Results;