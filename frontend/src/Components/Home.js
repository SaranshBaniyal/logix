import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [selectedCard, setSelectedCard] = useState(null);

  const cardToRoute = {
    manufacturer: '/manufacturer-route',
    distributor: '/distributor-route',
    retailer: '/retailer-route',
    user: '/user-route',
  };

  const handleCardSelect = (card) => {
    setSelectedCard(card);
  };

  return (
    <>
      <div className="home-container">
        <span className="title">Supply Chain Management</span>
        <div className="login-options">
          <h2>Login As:</h2>
          <div className="login-cards">
            <div
              className={`login-card manufacturer ${selectedCard === 'manufacturer' ? 'selected' : ''}`}
              onClick={() => handleCardSelect('manufacturer')}
            >
              Manufacturer
            </div>
            <div
              className={`login-card distributor ${selectedCard === 'distributor' ? 'selected' : ''}`}
              onClick={() => handleCardSelect('distributor')}
            >
              Distributor
            </div>
            <div
              className={`login-card retailer ${selectedCard === 'retailer' ? 'selected' : ''}`}
              onClick={() => handleCardSelect('retailer')}
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
