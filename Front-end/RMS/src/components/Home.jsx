import React, { useState, useEffect } from "react";
import logo from "./images/logo.png";
import food from "./images/food.png";
import pragatessh from "./images/prag.jpg";
import shanjay from "./images/Sanjai.jpg";
import saravanakumar from "./images/saravana.jpg";

const TestimonialCarousel = ({ testimonials }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        (prevIndex + 1) % testimonials.length
      );
    }, 3000); 

    return () => clearInterval(interval);
  }, [testimonials.length]);

  return (
    <div 
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
        overflow: 'hidden',
      }}
    >
      <div 
        style={{
          display: 'flex',
          transition: 'transform 0.5s ease-in-out',
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {testimonials.map((testimonial, index) => (
          <div 
            key={index}
            style={{
              minWidth: '100%',
              padding: '20px',
              boxSizing: 'border-box',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                width: "300px",
                padding: "20px",
                backgroundColor: "white",
                borderRadius: "15px",
                boxShadow: "0 8px 15px rgba(0,0,0,0.2)",
                textAlign: "center",
                transform: 'scale(1)',
                transition: 'transform 0.3s ease',
                border: '2px solid #ff6600',
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <img
                src={testimonial.image}
                alt={testimonial.name}
                style={{
                  width: "120px",
                  height: "120px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  marginBottom: "15px",
                  border: '4px solid #ff6600',
                }}
              />
              <h3
                style={{
                  fontSize: "24px",
                  color: "#333",
                  marginBottom: "10px",
                  fontFamily: '"Times New Roman", serif',
                }}
              >
                {testimonial.name}
              </h3>
              <p
                style={{
                  fontSize: "18px",
                  color: "#666",
                  fontFamily: '"Times New Roman", serif',
                  fontStyle: 'italic',
                }}
              >
                "{testimonial.quote}"
              </p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Dot Indicators */}
      <div 
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: '15px',
        }}
      >
        {testimonials.map((_, index) => (
          <div 
            key={index}
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: index === currentIndex ? '#ff6600' : '#ddd',
              margin: '0 5px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

const Home = () => {
  const testimonials = [
    {
      name: "Pragatessh",
      image: pragatessh,
      quote: "Developed the entire frontend using React, creating an intuitive and responsive user interface for our Foody App."
    },
    {
      name: "Shanjay Adhithya",
      image: shanjay,
      quote: "Implemented robust SQL database connectivity, ensuring seamless data management and retrieval for our application."
    },
    {
      name: "Saravanakumar M",
      image: saravanakumar,
      quote: "Developed the backend using Spring Boot, creating a powerful and efficient server-side architecture for our Foody App."
    }
  ];

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
          padding: "8px 15px",
          display: "flex",
          alignItems: "center",
          boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
          position: "fixed",
          top: 0,
          left: 0,
          height: "70px",
          zIndex: 1000,
        }}
      >
        {/* Logo Section */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src={logo}
            alt="Foody App Logo"
            style={{ height: "75px", width: "auto", marginRight: "10px" }}
          />
          <span
            style={{
              fontSize: "30px",
              fontWeight: "bold",
              color: "#ff6600",
              fontFamily: '"Times New Roman", serif',
            }}
          >
           Maran Parotta Kadaai
          </span>
        </div>
      </nav>

      {/* Main Content */}
      <div style={{ marginTop: "90px", width: "100%", maxWidth: "1200px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px",
            textAlign: "left",
          }}
        >
          {/* Image Section */}
          <div style={{ marginRight: "30px" }}>
            <img
              src={food}
              alt="Delicious Food"
              style={{
                width: "350px",
                height: "auto",
                borderRadius: "10px",
                boxShadow: "0 8px 15px rgba(0,0,0,0.2)",
              }}
            />
          </div>

          {/* Text Section */}
          <div style={{ maxWidth: "550px" }}>
            <h1
              style={{
                fontSize: "36px",
                color: "#333",
                fontFamily: '"Times New Roman", serif',
                fontWeight: "bold",
              }}
            >
              Welcome to Foody App!
            </h1>
            <p
              style={{
                fontSize: "22px",
                color: "#555",
                fontFamily: '"Times New Roman", serif',
                marginBottom: "12px",
              }}
            >
              Discover a world of flavors with our collection of delicious
              recipes. From traditional dishes to modern cuisine, find recipes
              that suit your taste. Join our community and share your love for
              cooking with others. Start your culinary adventure today!
            </p>

            <a
              href="/login"
              style={{
                display: "inline-block",
                marginTop: "15px",
                padding: "14px 30px",
                backgroundColor: "white",
                color: "#ff6600",
                textDecoration: "none",
                fontSize: "22px",
                fontWeight: "bold",
                fontFamily: '"Times New Roman", serif',
                border: "2px solid #ff6600",
                borderRadius: "8px",
                transition: "0.3s ease-in-out",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#ff6600";
                e.target.style.color = "white";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "white";
                e.target.style.color = "#ff6600";
              }}
            >
              Ready to Cook?
            </a>
          </div>
        </div>
      </div>

      {/* Footer with Testimonials Carousel */}
      <footer
        style={{
          width: "100%",
          backgroundColor: "#FFF5E6",
          padding: "40px 20px",
          textAlign: "center",
          marginTop: "auto",
        }}
      >
        <h2
          style={{
            fontSize: "32px",
            color: "#333",
            marginBottom: "40px",
            fontFamily: '"Times New Roman", serif',
            position: 'relative',
            display: 'inline-block',
          }}
        >
          Our Team's Contribution
          <div 
            style={{
              position: 'absolute',
              bottom: '-10px',
              left: 0,
              width: '100%',
              height: '4px',
              backgroundColor: '#ff6600',
            }}
          />
        </h2>
        
        <TestimonialCarousel testimonials={testimonials} />
      </footer>
    </div>
  );
};

export default Home;