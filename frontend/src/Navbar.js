import React from 'react'
import { Link } from 'react-router-dom'
import logo from './assets/logix2-removebg-preview.png';
const Navbar = () => {
  return (
    <div className='nav'>
        <span><Link to='/' style={{textDecoration:'none'}}><img src={logo} className='logo'/></Link></span>
        <span><button className='create-shipment-button1'>Connect Wallet</button></span>
    </div>
  )
}

export default Navbar