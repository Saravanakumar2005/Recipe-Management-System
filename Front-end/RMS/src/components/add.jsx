import React, { useState, useEffect } from "react";
import veg from "./images/plant.png";
import nonveg from "./images/p.png";

const AddRecipe = () => {
  const [formData, setFormData] = useState({
    username: "",
    recipeName: "",
    description: "",
    cuisine: "",
    course: "",
    diet: "",
    prepTime: "",
    ingredients: "",
    instructions: "",
    imageUrl: "",
  });

  const [submissionStatus, setSubmissionStatus] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (submissionStatus === "success") {
      alert("Recipe submitted successfully!");
      resetForm();
    }
  }, [submissionStatus]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.username || !formData.recipeName || !formData.ingredients) {
      alert("Username, Recipe Name, and Ingredients are required.");
      return;
    }

    const ingredientsArray = formData.ingredients
      .split(",")
      .map((ingredient) => ingredient.trim());

    const dataToSubmit = {
      username: formData.username,
      recipename: formData.recipeName,
      description: formData.description,
      cuisine: formData.cuisine,
      course: formData.course,
      diet: formData.diet,
      preptime: formData.prepTime,
      ingredients: ingredientsArray,
      instruction: formData.instructions,
      pageUrl: formData.imageUrl,
    };

    setIsSubmitting(true);

    try {
      const response = await fetch("http://localhost:8085/api/v1/user/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      });

      const contentType = response.headers.get("Content-Type");

      if (!response.ok) {
        const errorResponse = contentType && contentType.includes("application/json")
          ? await response.json()
          : await response.text();

        console.error("Error:", errorResponse);
        alert("Failed to submit recipe. " + (typeof errorResponse === "string" ? errorResponse : "Request failed."));
        return;
      }

      setSubmissionStatus("success");
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to submit recipe. " + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      username: "",
      recipeName: "",
      description: "",
      cuisine: "",
      course: "",
      diet: "",
      prepTime: "",
      ingredients: "",
      instructions: "",
      imageUrl: "",
    });
  };

  return (
    <div style={styles.formStyle}>
      <div style={styles.containerStyle}>
        <h2 style={styles.heading}>Recipe Submission Form</h2>
        <form onSubmit={handleSubmit}>
          {[ 
            { label: "Username", name: "username" },
            { label: "Recipe Name", name: "recipeName" },
            { label: "Description", name: "description", type: "textarea" },
            { label: "Cuisine", name: "cuisine" },
            { label: "Course", name: "course" },
            { label: "Diet", name: "diet" },
            { label: "Prep Time", name: "prepTime" },
            { label: "Ingredients (comma-separated)", name: "ingredients", type: "textarea" },
            { label: "Instructions", name: "instructions", type: "textarea" },
            { label: "Image URL", name: "imageUrl" },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <label style={styles.labelStyle}>{label}:</label>
              {type === "textarea" ? (
                <textarea
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  style={{ ...styles.inputStyle, height: "60px" }}
                />
              ) : (
                <input
                  type="text"
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  style={styles.inputStyle}
                />
              )}
            </div>
          ))}
          

          <button
            type="submit"
            style={isSubmitting ? styles.buttonDisabled : styles.buttonStyle}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit Recipe"}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  formStyle: {
    width: "100vw",
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingTop: "50px",
    background: "linear-gradient(to bottom, #fff 50%, #fff 100%)",
    color: "#000",
  },
  containerStyle: {
    width: "450px",
    padding: "20px",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    border: "2px solid yellow",
    color: "#000",
  },
  heading: {
    fontSize: "20px",
    fontWeight: "bold",
    marginBottom: "15px",
    color: "#000",
  },
  labelStyle: {
    fontWeight: "bold",
    display: "block",
    marginBottom: "5px",
    color: "#000",
  },
  inputStyle: {
    width: "100%",
    padding: "8px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    backgroundColor: "#fff",
    color: "#000",
  },
};

export default AddRecipe;
