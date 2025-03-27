import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "./images/logo.png";
import cap from "./images/cap.png";

const Register = () => {
  const navigate = useNavigate();
  const [message, setMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8085/api/v1/user/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const text = await response.text();
      const data = text.startsWith("{") ? JSON.parse(text) : { message: text };

      if (response.ok && data.message.includes("User registered successfully")) {
        setMessage("Registration Successful!");
        setTimeout(() => navigate("/welcome"), 1000);
      } else {
        setMessage(data.message || "Registration failed!");
      }
    } catch (error) {
      setMessage("Registration failed. Please try again.");
      console.error("Error:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to bottom, #FFCC99, #FFFFFF)",
        padding: "20px",
        boxSizing: "border-box",
        overflow: "auto",
      }}
    >
      <div style={{ width: "100%", maxWidth: "1200px" }}>
        <nav
          style={{
            width: "100%",
            backgroundColor: "white",
            padding: "5px",
            display: "flex",
            alignItems: "center",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
            position: "fixed",
            top: 0,
            left: 0,
            height: "50px",
            zIndex: 1000,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={logo} alt="Foody App Logo" style={{ height: "40px", marginRight: "10px" }} />
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
        </nav>

        <div style={{ marginTop: "80px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img src={cap} alt="Cap" style={{ width: "80px", marginBottom: "-25px" }} />
          <div
            style={{
              backgroundColor: "white",
              padding: "20px",
              borderRadius: "12px",
              width: "360px",
              textAlign: "center",
              marginTop: "15px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              border: "2px solid orange",
            }}
          >
            <h2 style={{ color: "#333", marginBottom: "10px", fontSize: "20px" }}>Sign Up</h2>
            {message && (
              <p style={{ color: message.includes("Successful") ? "green" : "red", fontSize: "14px" }}>{message}</p>
            )}

            <form onSubmit={handleSubmit} style={{ textAlign: "left" }}>
              <label style={{ display: "block", marginTop: "8px", fontWeight: "bold", color: "#ff6600", textAlign: "left" }}>
                Full Name:
              </label>
              <input
                type="text"
                name="userName"
                required
                value={formData.userName}
                onChange={handleChange}
                style={{
                  width: "97%",
                  padding: "8px",
                  marginTop: "4px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  backgroundColor: "white", 
                  color: "black", 
                }}
              />

              <label style={{ display: "block", marginTop: "8px", fontWeight: "bold", color: "#ff6600", textAlign: "left" }}>
                Email:
              </label>
              <input
                type="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                style={{
                  width: "97%",
                  padding: "8px",
                  marginTop: "4px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  backgroundColor: "white", 
                  color: "black", 
                }}
              />

              <label style={{ display: "block", marginTop: "8px", fontWeight: "bold", color: "#ff6600", textAlign: "left" }}>
                Password:
              </label>
              <div style={{ width: "100%", position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  style={{
                    width: "97%",
                    padding: "8px",
                    marginTop: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    backgroundColor: "white", // Changed
                    color: "black", // Changed
                  }}
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: "absolute",
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                    fontSize: "18px",
                  }}
                >
                  {showPassword ? "🔒" : "🔓"}
                </span>
              </div>

              <button
                type="submit"
                style={{
                  marginTop: "15px",
                  padding: "10px",
                  width: "100%",
                  backgroundColor: "#ff6600",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  fontSize: "16px",
                  cursor: "pointer",
                  transition: "0.3s ease",
                }}
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
