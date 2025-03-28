import React, { useState } from "react";
import recipeData from "./non-vegtration_Final.json";
import logo from "./images/logo.png";

const RecipeList = () => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [favorites, setFavorites] = useState({}); 
  
  const recipesWithIds = recipeData.map((recipe, index) => ({
    ...recipe,
    id: recipe.id || `recipe-${index}`
  }));

  const openRecipeModal = (recipe) => {
    setSelectedRecipe(recipe);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const closeProfileDropdown = () => {
    setShowProfileDropdown(false);
  };

  const toggleFavorite = (recipeId) => {
    setFavorites(prevFavorites => {
      // Create a new object to trigger re-render
      const newFavorites = {...prevFavorites};
      
      // Toggle the specific recipe's favorite status
      if (newFavorites[recipeId]) {
        delete newFavorites[recipeId];
      } else {
        newFavorites[recipeId] = true;
      }
      
      return newFavorites;
    });
  };

  const filteredRecipes = recipesWithIds.filter(recipe => 
    recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.cuisine.toLowerCase().includes(searchTerm.toLowerCase()) ||
    recipe.diet.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ 
      fontFamily: 'Georgia, Times New Roman, serif', 
      width: '100vw', 
      margin: '0 auto', 
      padding: '0',
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      background: 'linear-gradient(to bottom, #fff9f0, #fff)',
      minHeight: '100vh',
      position: 'relative'
    }}>
      <nav style={{
        width: '100%',
        backgroundColor: '#ff9800',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '15px 30px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        position: 'sticky',
        top: 0,
        zIndex: 1000
      }}>
        <div style={{
          color: 'white',
          fontSize: '24px',
          fontWeight: 'bold',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <img 
            src={logo} 
            alt="Maran Purota Kadaai Logo" 
            style={{
              height: '70px',
              width: '70px',
              objectFit: 'contain'
            }} 
          />
          Maran Purota Kadaai
        </div>
        
        <div style={{ position: 'relative' }}>
          <button 
            onClick={toggleProfileDropdown}
            style={{
              backgroundColor: 'white',
              color: '#ff9800',
              border: 'none',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: 'bold',
              boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              transition: 'all 0.3s ease',
              position: 'relative',
              left: '-20px'
            }}
          >
            <span style={{ 
              fontSize: '22px', 
              marginRight: '0px',
              position: 'relative',
              left: '0'
            }}>👤</span>
          </button>
          
          {showProfileDropdown && (
            <>
              <div
                onClick={closeProfileDropdown}
                style={{
                  position: 'fixed',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 101
                }}
              />
              
              <div style={{
                position: 'absolute',
                right: 0,
                top: '50px',
                backgroundColor: 'white',
                borderRadius: '8px',
                width: '150px',
                boxShadow: '0 6px 16px rgba(0,0,0,0.15)',
                zIndex: 102,
                overflow: 'hidden'
              }}>
                <div 
                  style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid #ffe0b2',
                    color: '#e65100',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fff3e0'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                  onClick={() => {
                    closeProfileDropdown();
                    alert("Navigate to Profile Page");
                  }}
                >
                  <span>🧑</span> Profile
                </div>
                <div 
                  style={{
                    padding: '12px 16px',
                    color: '#e65100',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fff3e0'}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'white'}
                  onClick={() => {
                    closeProfileDropdown();
                    alert("Logging out...");
                  }}
                >
                  <span>🚪</span> Log out
                </div>
              </div>
            </>
          )}
        </div>
      </nav>

      <div style={{ 
        width: '100%', 
        maxWidth: '1200px', 
        padding: '20px',
        boxSizing: 'border-box'
      }}>
        <h1 style={{ 
          textAlign: 'center', 
          color: '#f57c00', 
          marginBottom: '30px',
          fontSize: '2.5rem',
          textShadow: '1px 1px 2px rgba(0,0,0,0.1)'
        }}>
          Delicious Food Recipes
        </h1>
        
        <div style={{ 
          width: '100%', 
          maxWidth: '600px', 
          margin: '0 auto 30px',
          display: 'flex',
          justifyContent: 'center'
        }}>
          <input
            type="text"
            placeholder="Search recipes by name, description, cuisine or diet..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '14px 20px',
              fontSize: '16px',
              border: '2px solid #ff9800',
              borderRadius: '30px',
              outline: 'none',
              boxShadow: '0 4px 10px rgba(255, 152, 0, 0.2)',
              fontFamily: 'Georgia, serif',
              transition: 'all 0.3s ease'
            }}
          />
        </div>
        
        {searchTerm && (
          <p style={{ 
            margin: '0 0 15px 0', 
            fontStyle: 'italic', 
            color: '#e65100',
            textAlign: 'center',
            fontSize: '16px'
          }}>
            Found {filteredRecipes.length} {filteredRecipes.length === 1 ? 'recipe' : 'recipes'} matching "{searchTerm}"
          </p>
        )}

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', 
          gap: '25px',
          maxWidth: '1200px',
          width: '100%',
          justifyContent: 'center'
        }}>
          {filteredRecipes.length > 0 ? (
            filteredRecipes.map((recipe) => (
              <div key={recipe.id} style={{ 
                border: '1px solid #ffe0b2', 
                borderRadius: '12px',
                overflow: 'hidden',
                boxShadow: '0 6px 16px rgba(255, 152, 0, 0.15)',
                transition: 'all 0.4s ease',
                cursor: 'pointer',
                backgroundColor: '#fff',
                position: 'relative'
              }} 
              onMouseOver={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 24px rgba(255, 152, 0, 0.25)';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(255, 152, 0, 0.15)';
              }}
              onClick={() => openRecipeModal(recipe)}>
                <div style={{ height: '220px', overflow: 'hidden', position: 'relative' }}>
                  <img 
                    src={recipe.image_url} 
                    alt={recipe.name} 
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      transition: 'transform 0.5s ease' 
                    }} 
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                  />
                  <div style={{
                    position: 'absolute',
                    top: '10px',
                    right: '10px',
                    backgroundColor: 'rgba(255, 152, 0, 0.9)',
                    color: 'white',
                    borderRadius: '4px',
                    padding: '3px 8px',
                    fontSize: '14px',
                    fontWeight: 'bold'
                  }}>
                    ★ {recipe.ratings}
                  </div>
                </div>
                <div style={{ padding: '18px' }}>
                  <h3 style={{ 
                    margin: '0 0 12px 0', 
                    color: '#e65100', 
                    fontFamily: 'Georgia, serif',
                    fontSize: '20px'
                  }}>
                    {recipe.name}
                  </h3>
                  <div style={{
                    display: 'flex',
                    gap: '8px',
                    flexWrap: 'wrap',
                    marginBottom: '15px'
                  }}>
                    <span style={{
                      fontSize: '12px',
                      padding: '3px 8px',
                      borderRadius: '12px',
                      backgroundColor: '#fff3e0',
                      color: '#e65100'
                    }}>
                      {recipe.cuisine}
                    </span>
                    <span style={{
                      fontSize: '12px',
                      padding: '3px 8px',
                      borderRadius: '12px',
                      backgroundColor: '#fff3e0',
                      color: '#e65100'
                    }}>
                      {recipe.diet}
                    </span>
                  </div>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                      style={{
                        backgroundColor: '#ff9800',
                        color: 'white',
                        border: 'none',
                        padding: '10px 18px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '15px',
                        fontWeight: 'bold',
                        fontFamily: 'Georgia, serif',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 2px 5px rgba(255, 152, 0, 0.3)',
                        flex: 1
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = '#f57c00';
                        e.currentTarget.style.boxShadow = '0 4px 8px rgba(255, 152, 0, 0.4)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = '#ff9800';
                        e.currentTarget.style.boxShadow = '0 2px 5px rgba(255, 152, 0, 0.3)';
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        openRecipeModal(recipe);
                      }}
                    >
                      View Recipe
                    </button>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFavorite(recipe.id);
                      }}
                      style={{
                        backgroundColor: favorites[recipe.id] ? '#ffeb3b' : '#fff3e0',
                        color: favorites[recipe.id] ? '#e65100' : '#e65100',
                        border: 'none',
                        padding: '10px',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontSize: '15px',
                        fontWeight: 'bold',
                        fontFamily: 'Georgia, serif',
                        transition: 'all 0.3s ease',
                        boxShadow: '0 2px 5px rgba(255, 152, 0, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                      onMouseOver={(e) => {
                        e.currentTarget.style.backgroundColor = favorites[recipe.id] ? '#ffeb3b' : '#ffe0b2';
                        e.currentTarget.style.boxShadow = '0 4px 8px rgba(255, 152, 0, 0.4)';
                      }}
                      onMouseOut={(e) => {
                        e.currentTarget.style.backgroundColor = favorites[recipe.id] ? '#ffeb3b' : '#fff3e0';
                        e.currentTarget.style.boxShadow = '0 2px 5px rgba(255, 152, 0, 0.3)';
                      }}
                    >
                      {favorites[recipe.id] ? '❤ Saved' : '♡ Save'}
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div style={{ 
              gridColumn: '1 / -1', 
              textAlign: 'center', 
              padding: '40px',
              backgroundColor: '#fff3e0',
              borderRadius: '12px',
              boxShadow: '0 4px 10px rgba(255, 152, 0, 0.1)'
            }}>
              <p style={{ fontSize: '20px', color: '#e65100' }}>No recipes found matching your search. Try different keywords.</p>
            </div>
          )}
        </div>

        {showModal && selectedRecipe && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.6)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(5px)'
          }}>
            <div style={{
              backgroundColor: 'white',
              borderRadius: '15px',
              width: '92%',
              maxWidth: '850px',
              maxHeight: '90vh',
              overflow: 'auto',
              position: 'relative',
              boxShadow: '0 10px 30px rgba(0,0,0,0.3)',
              fontFamily: 'Georgia, serif',
              color: '#333',
              scrollbarWidth: 'thin',
              scrollbarColor: '#ff9800 #fff3e0'
            }}>
              <button 
                onClick={closeModal}
                style={{
                  position: 'absolute',
                  top: '15px',
                  right: '15px',
                  backgroundColor: '#ff5722',
                  color: 'white',
                  border: 'none',
                  borderRadius: '50%',
                  width: '36px',
                  height: '36px',
                  fontSize: '18px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  zIndex: 10,
                  fontFamily: 'Georgia, serif',
                  boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor = '#e64a19';
                  e.currentTarget.style.transform = 'scale(1.1)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = '#ff5722';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                &times;
              </button>
              
              <div style={{ height: '300px', overflow: 'hidden', position: 'relative' }}>
                <img 
                  src={selectedRecipe.image_url} 
                  alt={selectedRecipe.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
                <div style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                  padding: '20px',
                  color: 'white'
                }}>
                  <h2 style={{ 
                    margin: '0', 
                    textShadow: '1px 1px 3px rgba(0,0,0,0.5)', 
                    fontFamily: 'Georgia, serif',
                    fontSize: '28px'
                  }}>
                    {selectedRecipe.name}
                  </h2>
                </div>
              </div>
              
              <div style={{ padding: '25px' }}>
                <div style={{ margin: '0 0 20px' }}>
                  <p style={{ 
                    lineHeight: '1.7', 
                    color: '#333', 
                    fontFamily: 'Georgia, serif',
                    fontSize: '16px',
                    fontStyle: 'italic'
                  }}>
                    {selectedRecipe.description}
                  </p>
                </div>
                
                <div style={{ 
                  display: 'flex', 
                  gap: '12px', 
                  flexWrap: 'wrap', 
                  margin: '25px 0',
                  justifyContent: 'center'
                }}>
                  <div style={{ 
                    background: '#fff3e0', 
                    padding: '8px 16px', 
                    borderRadius: '20px', 
                    fontSize: '14px', 
                    color: '#e65100', 
                    fontFamily: 'Georgia, serif',
                    boxShadow: '0 2px 4px rgba(255, 152, 0, 0.1)'
                  }}>
                    <strong>Cuisine:</strong> {selectedRecipe.cuisine}
                  </div>
                  <div style={{ 
                    background: '#fff3e0', 
                    padding: '8px 16px', 
                    borderRadius: '20px', 
                    fontSize: '14px', 
                    color: '#e65100', 
                    fontFamily: 'Georgia, serif',
                    boxShadow: '0 2px 4px rgba(255, 152, 0, 0.1)'
                  }}>
                    <strong>Course:</strong> {selectedRecipe.course}
                  </div>
                  <div style={{ 
                    background: '#fff3e0', 
                    padding: '8px 16px', 
                    borderRadius: '20px', 
                    fontSize: '14px', 
                    color: '#e65100', 
                    fontFamily: 'Georgia, serif',
                    boxShadow: '0 2px 4px rgba(255, 152, 0, 0.1)'
                  }}>
                    <strong>Diet:</strong> {selectedRecipe.diet}
                  </div>
                  <div style={{ 
                    background: '#fff3e0', 
                    padding: '8px 16px', 
                    borderRadius: '20px', 
                    fontSize: '14px', 
                    color: '#e65100', 
                    fontFamily: 'Georgia, serif',
                    boxShadow: '0 2px 4px rgba(255, 152, 0, 0.1)'
                  }}>
                    <strong>Prep Time:</strong> {selectedRecipe.prep_time}
                  </div>
                  <div style={{ 
                    background: '#ff9800', 
                    padding: '8px 16px', 
                    borderRadius: '20px', 
                    fontSize: '14px', 
                    color: 'white', 
                    fontFamily: 'Georgia, serif',
                    boxShadow: '0 2px 4px rgba(255, 152, 0, 0.3)',
                    fontWeight: 'bold'
                  }}>
                    ★ {selectedRecipe.ratings}
                  </div>
                </div>
                
                <div style={{ 
                  display: 'flex',
                  gap: '10px',
                  marginBottom: '20px'
                }}>
                  <button 
                    style={{
                      backgroundColor: '#ff9800',
                      color: 'white',
                      border: 'none',
                      padding: '12px 20px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '15px',
                      fontWeight: 'bold',
                      fontFamily: 'Georgia, serif',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 2px 5px rgba(255, 152, 0, 0.3)',
                      flex: 1
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = '#f57c00';
                      e.currentTarget.style.boxShadow = '0 4px 8px rgba(255, 152, 0, 0.4)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = '#ff9800';
                      e.currentTarget.style.boxShadow = '0 2px 5px rgba(255, 152, 0, 0.3)';
                    }}
                  >
                    View Full Recipe
                  </button>
                  <button 
                    onClick={() => toggleFavorite(selectedRecipe.id)}
                    style={{
                      backgroundColor: favorites[selectedRecipe.id] ? '#ffeb3b' : '#fff3e0',
                      color: favorites[selectedRecipe.id] ? '#e65100' : '#e65100',
                      border: 'none',
                      padding: '12px 20px',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '15px',
                      fontWeight: 'bold',
                      fontFamily: 'Georgia, serif',
                      transition: 'all 0.3s ease',
                      boxShadow: '0 2px 5px rgba(255, 152, 0, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '5px'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = favorites[selectedRecipe.id] ? '#ffeb3b' : '#ffe0b2';
                      e.currentTarget.style.boxShadow = '0 4px 8px rgba(255, 152, 0, 0.4)';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = favorites[selectedRecipe.id] ? '#ffeb3b' : '#fff3e0';
                      e.currentTarget.style.boxShadow = '0 2px 5px rgba(255, 152, 0, 0.3)';
                    }}
                  >
                    {favorites[selectedRecipe.id] ? '❤ Saved to Favorites' : '♡ Save to Favorites'}
                  </button>
                </div>
                
                <div style={{ 
                  margin: '25px 0',
                  background: '#fff9f0',
                  padding: '20px',
                  borderRadius: '10px',
                  boxShadow: '0 2px 10px rgba(255, 152, 0, 0.1)'
                }}>
                  <h3 style={{ 
                    color: '#e65100', 
                    marginBottom: '15px', 
                    borderBottom: '2px solid #ffe0b2', 
                    paddingBottom: '8px', 
                    fontFamily: 'Georgia, serif',
                    fontSize: '22px'
                  }}>
                    Ingredients
                  </h3>
                  <div style={{ 
                    whiteSpace: 'pre-line', 
                    lineHeight: '1.8', 
                    color: '#333', 
                    fontFamily: 'Georgia, serif',
                    fontSize: '16px'
                  }}>
                    {selectedRecipe.ingredients}
                  </div>
                </div>
                
                <div style={{ 
                  margin: '25px 0',
                  background: '#fff9f0',
                  padding: '20px',
                  borderRadius: '10px',
                  boxShadow: '0 2px 10px rgba(255, 152, 0, 0.1)'
                }}>
                  <h3 style={{ 
                    color: '#e65100', 
                    marginBottom: '15px', 
                    borderBottom: '2px solid #ffe0b2', 
                    paddingBottom: '8px', 
                    fontFamily: 'Georgia, serif',
                    fontSize: '22px'
                  }}>
                    Instructions
                  </h3>
                  <div style={{ 
                    whiteSpace: 'pre-line', 
                    lineHeight: '1.9', 
                    color: '#333', 
                    fontFamily: 'Georgia, serif',
                    fontSize: '16px'
                  }}>
                    {selectedRecipe.instructions}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeList;