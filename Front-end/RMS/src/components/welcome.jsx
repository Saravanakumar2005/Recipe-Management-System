import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import logo from "./images/logo.png";
import veg from "./images/plant.png";
import nonveg from "./images/p.png";

const Welcome = () => {
  const [isVegHovered, setIsVegHovered] = useState(false);
  const [isNonVegHovered, setIsNonVegHovered] = useState(false);
  
  // Initialize navigate function
  const navigate = useNavigate();

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        background: "linear-gradient(to bottom, #FFCC99, #FFFFFF)",
        padding: "20px",
        boxSizing: "border-box",
        overflow: "auto",
      }}
    >
      {/* Navigation Bar */}
      <nav
        style={{
          width: "100%",
          backgroundColor: "white", 
          padding: "5px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0px 2px 5px rgba(115, 32, 32, 0.1)",
          position: "fixed",
          top: 0,
          left: 0,
          height: "50px",
          zIndex: 1000,
        }}
      >
        {/* Logo Section */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={logo}
            alt="Foody App Logo"
            style={{ height: "40px", width: "auto", marginRight: "10px" }}
          />
          <span
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#ff6600",
              fontFamily: '"Times New Roman", serif',
            }}
          >
            Maran Parotta Kadaai
          </span>
        </div>
        
        {/* Button - Navigates to "/order" */}
        <button 
          style={{
            backgroundColor: "#ff6600",
            color: "white",
            border: "none",
            padding: "8px 15px",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            marginRight: "100px"
          }}
          onClick={() => navigate('/add')}  // Navigate on click
        >
          Order Now
        </button>
      </nav>

      {/* Main Content */}
      <div 
        style={{
          marginTop: "80px",
          width: "100%",
          maxWidth: "1200px",
          display: "flex",
          justifyContent: "center",
          gap: "30px",
        }}
      >
        {/* Vegetarian Container */}
        <Link 
          to="/veg"
          style={{
            textDecoration: 'none',
            width: "45%",
            backgroundColor: isVegHovered ? "#FFF5E6" : "white",
            border: "2px solid #ff6600",
            borderRadius: "15px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
            transform: isVegHovered ? "scale(1.05)" : "scale(1)",
            boxShadow: isVegHovered 
              ? "0 10px 20px rgba(255,102,0,0.2)" 
              : "0 4px 6px rgba(0,0,0,0.1)",
          }}
          onMouseEnter={() => setIsVegHovered(true)}
          onMouseLeave={() => setIsVegHovered(false)}
        >
          <h2 
            style={{
              color: "#ff6600",
              marginBottom: "20px",
              fontSize: "28px",
              fontFamily: '"Times New Roman", serif',
            }}
          >
            Vegetarian Delights
          </h2>
          <img 
            src={veg} 
            alt="Vegetarian Food" 
            style={{
              width: "100%",
              maxHeight: "300px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        </Link>

        {/* Non-Vegetarian Container */}
        <Link 
          to="/nonveg"
          style={{
            textDecoration: 'none',
            width: "45%",
            backgroundColor: isNonVegHovered ? "#FFF5E6" : "white",
            border: "2px solid #ff6600",
            borderRadius: "15px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            transition: "all 0.3s ease",
            transform: isNonVegHovered ? "scale(1.05)" : "scale(1)",
            boxShadow: isNonVegHovered 
              ? "0 10px 20px rgba(255,102,0,0.2)" 
              : "0 4px 6px rgba(0,0,0,0.1)",
          }}
          onMouseEnter={() => setIsNonVegHovered(true)}
          onMouseLeave={() => setIsNonVegHovered(false)}
        >
          <h2 
            style={{
              color: "#ff6600",
              marginBottom: "20px",
              fontSize: "28px",
              fontFamily: '"Times New Roman", serif',
            }}
          >
            Non-Vegetarian Feast
          </h2>
          <img 
            src={nonveg} 
            alt="Non-Vegetarian Food" 
            style={{
              width: "100%",
              maxHeight: "300px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
