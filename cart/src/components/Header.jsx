import {Link} from 'react-router-dom';
import React from 'react'

const Header = () => {
  return (
    <div style={{height:"50px",backgroundColor:"blue",display:'flex',justifyContent:'space-around'}}>
        <Link to="/" style={{textDecorationLine:'none'}}><h2 style={{color:"white"}}>Home</h2></Link>
        <Link to="/cart" style={{textDecorationLine:'none'}} ><h2 style={{color:"white"}}>Cart</h2></Link>
    </div>
  )
}

export default Header
