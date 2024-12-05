import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';


const fetchData = async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return response.data; 
};

const App = () => {
  const [data, setData] = useState([]);

  
  const handleFetchData = () => {
    const myPromise = fetchData(); 

    
    toast.promise(myPromise, {
      loading: 'Loading data...',        
      success: 'Data loaded successfully!',  
      error: 'Error occurred while fetching data',  
    });

    
    myPromise.then((data) => setData(data));
  };

  return (
    <div>
      <h1>React Hot Toast Example</h1>
      <button onClick={handleFetchData}>Fetch Data</button>

      {/* Display the fetched data */}
      <ul>
        {data.length > 0 && data.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
  <Toaster />
    </div>
  );
};

export default App;
