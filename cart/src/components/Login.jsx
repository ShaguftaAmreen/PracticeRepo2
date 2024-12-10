import React, { useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';

const Login = () => {
    let [email,setEmail]=useState("");
    let [password,setPassword] = useState("")
    const submit=(e)=>{
        e.preventDefault();
        toast.success("Logged In");
        }
  return (
    <form onSubmit={submit}>
      <input type='email' value={email} onChange={(e)=>{setEmail(e.target.value)}} style={{width:"30%",height:"20px"}}/><br></br><br></br>
      <input type='password' value={password} onChange={(e)=>{setPassword(e.target.value)}} style={{width:"30%",height:"20px"}}/><br></br> <br></br>
      <input type='submit'/>
      <Toaster />
    </form>
  )
}

export default Login
