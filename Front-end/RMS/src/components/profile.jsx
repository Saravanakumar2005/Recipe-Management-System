import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "./images/logo.png";
import profilePic from "./images/cap.png";

const Profile = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userRecipes, setUserRecipes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
 
  const username = localStorage.getItem("username") || "User";
  const email = localStorage.getItem("email") || "user@example.com";

  useEffect(() => {
    fetchUserRecipes();
  }, []);

  const fetchUserRecipes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:8085/api/v1/user/recipes/${username}`);
      setUserRecipes(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch recipes. Please try again.');
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    navigate("/");
  };

  const openRecipeModal = (recipe) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div style={styles.pageContainer}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.logoContainer}>
          <img
            src={logo}
            alt="Foody App Logo"
            style={styles.logo}
          />
          <span style={styles.appName}>
            Maran Parotta Kadaai
          </span>
        </div>

        {/* Profile Dropdown */}
        <div style={{ position: "relative" }}>
          <div
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={styles.profileIcon}
          >
            <span style={styles.profileInitial}>
              {username[0].toUpperCase()}
            </span>
          </div>

          {dropdownOpen && (
            <div style={styles.dropdownMenu}>
              <div style={styles.dropdownHeader}>
                <strong>{username}</strong>
                <div style={styles.dropdownEmail}>{email}</div>
              </div>
              <div
                onClick={handleLogout}
                style={styles.logoutButton}
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
      <div style={styles.profileContent}>
        <img
          src={profilePic}
          alt="Profile"
          style={styles.profileImage}
        />
        <h1 style={styles.welcomeText}>
          Welcome, {username}!
        </h1>
        <p style={styles.emailText}>
          Email: {email}
        </p>
      </div>

      {/* User Recipes Section */}
      <div style={styles.recipesContainer}>
        <h2 style={styles.recipesTitle}>
          Your Saved Recipes
        </h2>

        {loading ? (
          <div style={styles.loadingState}>
            Loading your recipes...
          </div>
        ) : error ? (
          <div style={styles.errorState}>
            {error}
          </div>
        ) : userRecipes.length === 0 ? (
          <div style={styles.emptyState}>
            <p style={styles.emptyStateText}>
              You haven't saved any recipes yet. Start exploring!
            </p>
          </div>
        ) : (
          <div style={styles.recipeGrid}>
            {userRecipes.map((recipe) => (
              <div 
                key={recipe.id}
                style={styles.recipeCard}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
                onClick={() => openRecipeModal(recipe)}
              >
                <img 
                  src={recipe.pageUrl} 
                  alt={recipe.recipename}
                  style={styles.recipeImage}
                />
                <div style={styles.recipeCardContent}>
                  <h3 style={styles.recipeTitle}>
                    {recipe.recipename}
                  </h3>
                  <div style={styles.recipeDetails}>
                    <span>{recipe.cuisine}</span>
                    <span>★ {recipe.ratings || 'N/A'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recipe Modal */}
      {showModal && selectedRecipe && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <div style={styles.modalHeader}>
              <h2 style={styles.modalTitle}>
                {selectedRecipe.recipename}
              </h2>
              <button 
                onClick={closeModal}
                style={styles.closeButton}
              >
                ×
              </button>
            </div>
            <img 
              src={selectedRecipe.pageUrl} 
              alt={selectedRecipe.recipename}
              style={styles.modalImage}
            />
            <div style={styles.modalDetails}>
              <h3 style={styles.sectionTitle}>Description</h3>
              <p>{selectedRecipe.description}</p>

              <h3 style={styles.sectionTitle}>Cuisine</h3>
              <p>{selectedRecipe.cuisine}</p>

              <h3 style={styles.sectionTitle}>Course</h3>
              <p>{selectedRecipe.course}</p>

              <h3 style={styles.sectionTitle}>Diet</h3>
              <p>{selectedRecipe.diet}</p>

              <h3 style={styles.sectionTitle}>Prep Time</h3>
              <p>{selectedRecipe.preptime}</p>

              <h3 style={styles.sectionTitle}>Ingredients</h3>
              <p>{selectedRecipe.ingredients.join(', ')}</p>
              
              <h3 style={styles.sectionTitle}>Instructions</h3>
              <p>{selectedRecipe.instruction}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  pageContainer: {
    width: "100vw",
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    background: "linear-gradient(to bottom, #FFCC99, #FFFFFF)",
    padding: "20px",
    boxSizing: "border-box",
    overflow: "auto",
  },
  navbar: {
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
  },
  logoContainer: {
    display: "flex", 
    alignItems: "center"
  },
  logo: {
    height: "40px", 
    width: "auto", 
    marginRight: "10px"
  },
  appName: {
    fontSize: "24px",
    fontWeight: "bold",
    color: "orange",
    fontFamily: '"Times New Roman", serif',
  },
  profileIcon: {
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    backgroundColor: "#ff6600",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
    marginRight: "20px",
  },
  profileInitial: {
    color: "white", 
    fontWeight: "bold"
  },
  dropdownMenu: {
    position: "absolute",
    top: "50px",
    right: "20px",
    width: "200px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
    zIndex: 1100,
  },
  dropdownHeader: {
    padding: "15px",
    borderBottom: "1px solid #eee",
    textAlign: "center",
  },
  dropdownEmail: {
    color: "#666", 
    fontSize: "0.8em"
  },
  logoutButton: {
    padding: "10px 15px",
    cursor: "pointer",
    color: "#ff6600",
    fontWeight: "bold",
    textAlign: "center",
    transition: "background-color 0.3s ease",
  },
  profileContent: {
    marginTop: "80px",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  profileImage: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "4px solid #ff6600",
    marginBottom: "20px",
  },
  welcomeText: {
    color: "#333", 
    marginBottom: "10px"
  },
  emailText: {
    color: "#666", 
    textAlign: "center"
  },
  recipesContainer: {
    width: '100%', 
    maxWidth: '1200px', 
    margin: '20px auto',
    padding: '0 20px'
  },
  recipesTitle: {
    textAlign: 'center', 
    color: '#ff6600', 
    marginBottom: '20px'
  },
  loadingState: {
    textAlign: 'center', 
    padding: '40px',
    color: '#ff6600'
  },
  errorState: {
    textAlign: 'center', 
    padding: '40px',
    backgroundColor: '#FFF3E0',
    borderRadius: '12px',
    color: '#ff6600'
  },
  emptyState: {
    textAlign: 'center', 
    padding: '40px',
    backgroundColor: '#FFF3E0',
    borderRadius: '12px'
  },
  emptyStateText: {
    fontSize: '18px', 
    color: '#ff6600'
  },
  recipeGrid: {
    display: 'grid', 
    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', 
    gap: '20px'
  },
  recipeCard: {
    border: '1px solid #FFD699',
    borderRadius: '10px',
    overflow: 'hidden',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    transition: 'transform 0.3s ease',
    cursor: 'pointer'
  },
  recipeImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover'
  },
  recipeCardContent: {
    padding: '10px',
    backgroundColor: 'white'
  },
  recipeTitle: {
    margin: '0 0 10px 0', 
    color: '#ff6600',
    fontSize: '18px'
  },
  recipeDetails: {
    display: 'flex', 
    justifyContent: 'space-between',
    color: '#666'
  },
  modalOverlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2000
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: '10px',
    width: '90%',
    maxWidth: '600px',
    maxHeight: '80%',
    overflow: 'auto',
    padding: '20px'
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px'
  },
  modalTitle: {
    color: '#ff6600', 
    margin: 0
  },
  closeButton: {
    background: 'none',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
    color: '#ff6600'
  },
  modalImage: {
    width: '100%',
    maxHeight: '300px',
    objectFit: 'cover',
    borderRadius: '10px',
    marginBottom: '20px'
  },
  modalDetails: {
    padding: '0 10px'
  },
  sectionTitle: {
    color: '#ff6600',
    marginTop: '15px'
  }
};

export default Profile;