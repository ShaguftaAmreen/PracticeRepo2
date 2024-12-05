import { useEffect, useState } from "react";
import toast from 'react-hot-toast';


export const useToast = (fetchProducts) => {

    const [data,setData]=useState()

    useEffect(() => {
    const myPromise = fetchProducts(); 
      toast.promise(myPromise, {
      loading: 'Loading products...',
      success: (res)=> {
        setData(res)
        console.log("resss",res)
        
        return 'Got the products data!!'},
      error: (err) => `Error when fetching: ${err?.message}`,
    });
  }, [fetchProducts]); 


  return {data};
  };
