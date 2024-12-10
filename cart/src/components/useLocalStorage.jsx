import { useState,useEffect } from "react";

function getSavedValue(key,initialValue){
    const SavedValue=JSON.parse(localStorage.getItem(key));
    if(SavedValue) return SavedValue;

if(initialValue instanceof Function) return initialValue()

    return initialValue
}

export default function useLocalStorage(key,initialValue){
const [value,setValue]=useState(()=>{
    return getSavedValue(key,initialValue)
})

useEffect(()=>{
localStorage.setItem(key, JSON.stringify(value))
},[value])

return [value,setValue];

}