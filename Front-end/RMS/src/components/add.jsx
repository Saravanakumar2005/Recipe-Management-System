import React, { useState, useEffect } from "react";

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
  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle success or error messages after form submission
  useEffect(() => {
    if (submissionStatus === "success") {
      alert("Recipe submitted successfully!");
      resetForm();
    } else if (submissionStatus === "error") {
      alert("Failed to submit recipe. " + errorMessage);
    }
  }, [submissionStatus]);

  // Handle input changes and update form data state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission with validation
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data before submitting
    if (!formData.username || !formData.recipeName || !formData.ingredients) {
      setErrorMessage("Username, Recipe Name, and Ingredients are required.");
      return;
    }

    // Parse ingredients to an array of trimmed strings
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
    setErrorMessage(""); // Clear any previous error message

    try {
      const response = await fetch("http://localhost:8085/api/v1/user/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSubmit),
      });

      // Check response content type to handle both JSON and plain text
      const contentType = response.headers.get("Content-Type");

      if (!response.ok) {
        const errorResponse = contentType && contentType.includes("application/json")
          ? await response.json()
          : await response.text();
        console.error("Error:", errorResponse);
        throw new Error("Request failed with status: " + response.status);
      }

      // Process JSON response if available
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        console.log(data);
        setSubmissionStatus("success");
      } else {
        // Handle plain text response
        const textResponse = await response.text();
        console.log("Plain Text Response:", textResponse);
        setSubmissionStatus("success");
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorMessage(error.message);
      setSubmissionStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Reset form data
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

          {errorMessage && <p style={styles.errorText}>{errorMessage}</p>}

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
  buttonStyle: {
    backgroundColor: "#ff9800",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    display: "block",
    width: "100%",
    fontWeight: "bold",
  },
  buttonDisabled: {
    backgroundColor: "#ccc",
    color: "white",
    padding: "10px 15px",
    border: "none",
    borderRadius: "4px",
    cursor: "not-allowed",
    display: "block",
    width: "100%",
    fontWeight: "bold",
  },
  errorText: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px",
  },
};

export default AddRecipe;
