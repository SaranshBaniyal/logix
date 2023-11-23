import React, { useState } from 'react';
import { Link, redirect } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Home = (Contract) => {
  const Navigate = useNavigate();
  const [selectedCard, setSelectedCard] = useState(null);
  console.log(Contract)
  const cardToRoute = {
    manufacturer: '/manufacturer-route',
    distributor: '/distributor-route',
    retailer: '/retailer-route',
    user: '/user-route',
  };

  const checkmanu = async()=>{
    const check = await Contract.Contract.existmanu();
    console.log(check)
    return check;
  }

   const checkDis = async()=>{
    const check = await Contract.Contract.exisdistri();
    return check;
   }

   const checkretai = async()=>{
    const check = await Contract.Contract.existretail();
    return check;
   }
  
  const handleCardSelect = (card) => {
    setSelectedCard(card);
  };

  const checkManufact = async() =>{
    const abc = await checkmanu()
    if(abc){
      handleCardSelect('manufacturer');
    }else{
      handleCardSelect('/')
      Navigate('/signup/manu')
    }
  }

  const checkDist = async()=>{
    const abc = await checkDis()
    if(abc){
      handleCardSelect('distributor');
    }else{
      handleCardSelect('/')
      Navigate('/signup/distributor')
    }
  }

  const checkRetailer = async ()=>{
    const abc = await checkretai()
    if(abc){
      handleCardSelect('retailer');
    }else{
      handleCardSelect('/')
      Navigate('/signup/retail')
    }
  }
  
  return (
    <>
      <div className="home-container">
        <span className="title">Supply Chain Management</span>
        <div className="login-options">
          <h2>Login As:</h2>
          <div className="login-cards">
            <div
              className={`login-card manufacturer ${selectedCard === 'manufacturer' ? 'selected' : ''}`}
              onClick={checkManufact}
            >
              Manufacturer
            </div>
            <div
              className={`login-card distributor ${selectedCard === 'distributor' ? 'selected' : ''}`}
              onClick={checkDist}
            >
              Distributor
            </div>
            <div
              className={`login-card retailer ${selectedCard === 'retailer' ? 'selected' : ''}`}
              onClick={checkRetailer}
            >
              Retailer
            </div>
            <div
              className={`login-card user ${selectedCard === 'user' ? 'selected' : ''}`}
              onClick={() => handleCardSelect('user')}
            >
              User
            </div>
          </div>
          <button className="btn1">
            <Link to={cardToRoute[selectedCard]} className="btnlink">
              Continue
            </Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Home;
