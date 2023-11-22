import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import Manufacturer from './Components/Manufacturer';
import Retailer from './Components/Retailer';
import Distributor from './Components/Distributor';
import User from './Components/User';
import Newshipment from './Components/Newshipment';
import Navbar from './Navbar';
import Signup from './Components/Signup';
import instance from './Shipment.json';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'
import logo from './assets/logix2-removebg-preview.png';
import {ethers} from 'ethers'

function App() {

  const contractaddress = instance.networks[5777].address;
  const abi = instance.abi

  const [address, setaddress] = useState('')
  
  const setup = async ()=>{
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner()
      const contract = new ethers.Contract(contractaddress,abi,signer)
      console.log(contract)
  }
  useEffect(() => {
    if (window.ethereum == null) {
      alert("please install metamask");
    }
    else { 
      // alert("click on connect wallet to connect to metamask")
    }
    setup()
  }, [address])

  const connectwallet = async () => {
    const address = await window.ethereum.request({
      "method": "eth_requestAccounts",
      "params": []
    });
    console.log(address[0])
    setaddress(address[0]);
  }

  return (
    <Router>
      <div className="App">

      <div className='nav'>
          <span><Link to='/' style={{ textDecoration: 'none' }}><img src={logo} className='logo' /></Link></span>
      {!address ? 
          <span><button className='create-shipment-button1' onClick={connectwallet}>Connect Wallet</button></span>
       : <button className='create-shipment-button1'>{address} </button>}  
        </div>

        <Routes>

          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/manufacturer-route' element={<Manufacturer />} />
          <Route path='/retailer-route' element={<Retailer />} />
          <Route path='/distributor-route' element={<Distributor />} />
          <Route path='/user-route' element={<User />} />
          <Route path='/new-shipment' element={<Newshipment />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
