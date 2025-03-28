import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./images/logo.png";
import profilePic from "./images/cap.png"; // Using cap image as profile picture

const Profile = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  // Retrieve user information from localStorage
  const username = localStorage.getItem("username") || "User";
  const email = localStorage.getItem("email") || "user@example.com";

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("password");

    // Navigate to login page
    navigate("/");
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "linear-gradient(to bottom, #FFCC99, #FFFFFF)",
        padding: "20px",
        boxSizing: "border-box",
        overflow: "auto",
      }}
    >
      {/* Navbar */}
      <nav
        style={{
          width: "100%",
          backgroundColor: "white",
          padding: "5px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          boxShadow: "0px 2px 5px rgba(115, 32, 32, 0.1)",
          position: "fixed",
          top: 0,
          left: 0,
          height: "50px",
          zIndex: 1000,
        }}
      >
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
              color: "orange",
              fontFamily: '"Times New Roman", serif',
            }}
          >
            Maran Parotta Kadaai
          </span>
        </div>

        {/* Profile Dropdown */}
        <div style={{ position: "relative" }}>
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              backgroundColor: "#ff6600",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              cursor: "pointer",
              marginRight: "20px",
            }}
          >
            <span style={{ color: "white", fontWeight: "bold" }}>
              {username[0].toUpperCase()}
            </span>
          </div>

          {dropdownOpen && (
            <div
              style={{
                position: "absolute",
                top: "50px",
                right: "20px",
                width: "200px",
                backgroundColor: "white",
                borderRadius: "8px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                zIndex: 1100,
              }}
            >
              <div
                style={{
                  padding: "15px",
                  borderBottom: "1px solid #eee",
                  textAlign: "center",
                }}
              >
                <strong>{username}</strong>
                <div style={{ color: "#666", fontSize: "0.8em" }}>{email}</div>
              </div>
              <div
                onClick={handleLogout}
                style={{
                  padding: "10px 15px",
                  cursor: "pointer",
                  color: "#ff6600",
                  fontWeight: "bold",
                  textAlign: "center",
                  transition: "background-color 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.target.style.backgroundColor = "#f0f0f0";
                }}
                onMouseOut={(e) => {
                  e.target.style.backgroundColor = "transparent";
                }}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Profile Content */}
      <div
        style={{
          marginTop: "80px",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={profilePic}
          alt="Profile"
          style={{
            width: "150px",
            height: "150px",
            borderRadius: "50%",
            objectFit: "cover",
            border: "4px solid #ff6600",
            marginBottom: "20px",
          }}
        />
        <h1 style={{ color: "#333", marginBottom: "10px" }}>
          Welcome, {username}!
        </h1>
        <p style={{ color: "#666", textAlign: "center" }}>
          Email: {email}
        </p>
      </div>
    </div>
  );
};

export default Profile;