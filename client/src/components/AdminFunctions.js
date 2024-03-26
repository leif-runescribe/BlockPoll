import axios from 'axios';
import React, {useState} from 'react'

const AdminFunctions = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showData, setShowData] = useState(false)
    const options = [
      { label: 'View Admin', endpoint: 'http://localhost:3001/view-admins' },
      { label: 'Start Election', endpoint: 'http://localhost:3001/start-election' },
      { label: 'End Election', endpoint: 'http://localhost:3001/end-election' },
      { label: 'View Votes', endpoint: 'http://localhost:3001/poll-votes' },
      { label: 'Voting Status', endpoint: 'http://localhost:3001/voting-status' },
      { label: 'Poll Details', endpoint: 'http://localhost:3001/poll-details' },
      
      // Add more options as needed
    ];
  
    const fetchData = async (endpoint) => {
      setLoading(true);
      setError(null);
      setData(null);
  
      try {
        const response = await axios.post(endpoint);
        const data = response.data;
  
        console.log(data)
        
        setData(data);
        
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
  
    const handleOptionClick = (option) => {
      setShowData(true)
      setSelectedOption(option);
      fetchData(option.endpoint);
      setShowData(true)
    };
    const handleCloseClick = ()=>{
      setShowData(false)
    }
  
    return (
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-4">Admin Functions</h1>
        <div className="flex flex-wrap mb-4">
          {options.map((option, index) => (
            <button
              key={index}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 mb-2 ${
                selectedOption === option ? 'bg-blue-700' : ''
              }`}
              onClick={() => handleOptionClick(option)}
            >
              {option.label}
            </button>
          ))}
        </div>
        {loading && <h1>Loading...</h1>}
        {error && <h1 className="text-red-500">{error}</h1>}
        {showData && data && (
          <>
           <button
            className="absolute top-86 right-44 bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-2 rounded"
            onClick={handleCloseClick}
          >
            &times;
          </button>
          <pre className="bg-gray-200 p-4 rounded">
            {console.log(data)}
            {JSON.stringify(data, null, 2)}
          </pre>
          </>
        )}
      </div>
    );
}

export default AdminFunctions