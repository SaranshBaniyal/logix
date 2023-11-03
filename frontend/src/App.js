import './App.css';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import Manufacturer from './Components/Manufacturer';
import Retailer from './Components/Retailer';
import Distributor from './Components/Distributor';
import User from './Components/User';
import Newshipment from './Components/Newshipment';
import Navbar from './Navbar';
import Signup from './Components/Signup';

function App() {
  return (
    <Router>
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/manufacturer-route' element={<Manufacturer/>}/>
        <Route path='/retailer-route' element={<Retailer/>}/>
        <Route path='/distributor-route' element={<Distributor/>}/>
        <Route path='/user-route' element={<User/>}/>
        <Route path='/new-shipment' element={<Newshipment/>}/>
      </Routes>
    </div>
    </Router>
  );
}

export default App;
