import React, { useState } from "react";
import {Link,useNavigate } from "react-router-dom";
import logo from "./images/logo.png";
import cap from "./images/cap.png";



const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8085/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("API Response:", data);


      if (response.ok && data.message === "Login Successful") {
        localStorage.setItem("username", data.username);
      localStorage.setItem("email", email); // Email from input
      localStorage.setItem("password", password); // Store only if required (Not recommended for security reasons)
      console.log("Stored in localStorage:", data.username, email, password);
        navigate("/welcome"); 
      } else {
        alert(data.message || "Invalid email or password!");
      }
    } 
    catch (error) {
      alert("Login failed. Please try again.");
      console.error("Error:", error);
    }
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
        {/* Navbar */}
        <nav
          style={{
            width: "100%",
            backgroundColor: "white",
            padding: "5px",
            display: "flex",
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
        </nav>

        {/* Login Form */}
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
            src={cap}
            alt="Cap Image"
            style={{ width: "100px", height: "auto", marginBottom: "-30px" }}
          />
          <div
            style={{
              backgroundColor: "white",
              padding: "30px",
              borderRadius: "12px",
              boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
              width: "360px",
              textAlign: "center",
              marginTop: "10px",
            }}
          >
            <h2 style={{ color: "#333", marginBottom: "10px" }}>Login</h2>

            <form onSubmit={handleSubmit}>
              {/* Email Input */}
              <label
                style={{
                  display: "block",
                  marginTop: "10px",
                  fontWeight: "bold",
                  textAlign: "left",
                  color: "#ff6600",
                }}
              >
                Email:
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  width: "100%",
                  padding: "10px",
                  marginTop: "5px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  backgroundColor: "white",
                  color: "black",
                  fontSize: "16px",
                }}
              />

              {/* Password Input */}
              <label
                style={{
                  display: "block",
                  marginTop: "10px",
                  fontWeight: "bold",
                  textAlign: "left",
                  color: "#ff6600",
                }}
              >
                Password:
              </label>
              <div style={{ width: "100%", position: "relative" }}>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "10px",
                    marginTop: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    backgroundColor: "white",
                    color: "black",
                    fontSize: "16px",
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
                    color: "black",
                    fontSize: "16px",
                  }}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </span>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                style={{
                  marginTop: "20px",
                  padding: "12px",
                  width: "100%",
                  backgroundColor: "#ff6600",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  fontSize: "18px",
                  cursor: "pointer",
                  transition: "0.3s ease",
                }}
                onMouseOver={(e) =>
                  (e.target.style.backgroundColor = "#cc5200")
                }
                onMouseOut={(e) =>
                  (e.target.style.backgroundColor = "#ff6600")
                }
              >
                Login
              </button>
            </form>

            {/* Signup Link */}
            <p
              style={{
                marginTop: "25px",
                textAlign: "center",
                fontWeight: "bold",
                color: "black",
              }}
            >
              Don't have an account?
            </p>
            <Link
              to="/register"
              style={{
                color: "#ff6600",
                textDecoration: "none",
                fontWeight: "bold",
                display: "block",
                marginTop: "5px",
              }}
              onMouseOver={(e) => (e.target.style.textDecoration = "underline")}
              onMouseOut={(e) => (e.target.style.textDecoration = "none")}
            >
              Signup here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;