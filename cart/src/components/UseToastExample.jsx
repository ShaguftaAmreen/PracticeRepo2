import React from 'react';
import  { Toaster } from 'react-hot-toast';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { useToast } from './useToast';


const fetchData = async () => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
  return response.data;
};

const UseToastExample = () => {
  
//   const { data: posts, isLoading, isError, error } = useQuery({
//     queryKey: ['posts'],   
//     queryFn: fetchData,    
//   });

  
  const {data:posts}=useToast(fetchData);

  return (
    <div>
      <ul>
        {posts?.length > 0 && posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
     <Toaster />
    </div>
  );
};

export default UseToastExample;
