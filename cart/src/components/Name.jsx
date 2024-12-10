import React from 'react'
import useLocalStorage from './useLocalStorage'
import useUpdateLogger from './useUpdateLogger';

const Name = () => {
    const [name,setName]=useLocalStorage("name",'');
    useUpdateLogger(name)
  return (
    <div>
      <input type='text'
      style={{width:'100%',height:"30px",marginTop:"30px"}}
      value={name} onChange={(e)=>setName(e.target.value)} />
    </div>
  )
}

export default Name
