import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [error, setError] = useState("");

  // Validation functions
  const validateName = (name) => /^[A-Z][a-z]*(\s[A-Z][a-z]*)?$/.test(name); // Supports full name with a space

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email); // Basic email validation

  const validatePassword = (password) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);

  const doPasswordsMatch = (password, confirmPassword) => password === confirmPassword;

  // Handle input change for name and email
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => {
      let newErrors = { ...prev };

      if (name === "name") {
        newErrors.name = validateName(value)
          ? ""
          : "Name must start with an uppercase letter. Full names are allowed.";
      }

      if (name === "email") {
        newErrors.email = validateEmail(value)
          ? ""
          : "Please enter a valid email address.";
      }

      return newErrors;
    });
  };

  // Handle password change
  const handlePasswordChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    setErrors((prev) => {
      let newErrors = { ...prev };

      // Validate password
      if (name === "password") {
        newErrors.password = validatePassword(value)
          ? ""
          : "Password must be at least 8 characters long, include a number, an uppercase letter, and a special character.";
      }

      // Validate confirm password when either field changes
      if (name === "password" || name === "confirmpassword") {
        newErrors.confirmpassword = doPasswordsMatch(
          name === "password" ? value : formData.password,
          name === "confirmpassword" ? value : formData.confirmpassword
        )
          ? ""
          : "Passwords do not match.";
      }

      return newErrors;
    });
  };

  // Handle form submission
  const handleRegister = async (event) => {
    event.preventDefault();

    // Check for empty fields or validation errors
    if (!formData.name || !formData.email || !formData.password || !formData.confirmpassword) {
      setError("All fields are required.");
      return;
    }

    if (errors.name || errors.email || errors.password || errors.confirmpassword) {
      setError("Please fix all errors before registering.");
      return;
    }

    try {
      // Send POST request to JSON server without points field
      const response = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          tasks: [], // Initialize empty tasks array
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to register user: ${response.statusText}`);
      }

      const result = await response.json();
      console.log("User registered successfully:", result);
      alert("Registration successful!");

      // Reset form fields
      setFormData({
        name: "",
        email: "",
        password: "",
        confirmpassword: "",
      });

      setError("");
    } catch (err) {
      console.error(err);
      setError("An error occurred while registering. Please try again.");
    }
  };

  // Handle key press (Enter key submission)
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleRegister(event);
    }
  };

  // Handle hover effect for links
  const handleNavHover = (event, color) => {
    event.target.style.color = color;
  };

  return (
    <div className="main-wrapper">
      <div className="container">
        <div className="left-content">
          Join the Future.<br />
          <span style={{ fontSize: "20px", fontWeight: "normal" }}>
            Create Your Account Today.
          </span>
        </div>

        <div className="divider"></div>

        <div className="registercontainer">
          <div className="register">
            <h1>Register</h1>
            <form onSubmit={handleRegister}>
              <p>Name</p>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                required
                value={formData.name}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
              />
              {errors.name && <small style={{ color: "red" }}>{errors.name}</small>}

              <p><br />Email</p>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                value={formData.email}
                onChange={handleInputChange}
                onKeyDown={handleKeyPress}
              />
              {errors.email && <small style={{ color: "red" }}>{errors.email}</small>}

              <p><br />Password</p>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                required
                value={formData.password}
                onChange={handlePasswordChange}
                onKeyDown={handleKeyPress}
              />
              {errors.password && <small style={{ color: "red" }}>{errors.password}</small>}

              <p><br />Confirm Password</p>
              <input
                type="password"
                name="confirmpassword"
                placeholder="Confirm your password"
                required
                value={formData.confirmpassword}
                onChange={handlePasswordChange}
                onKeyDown={handleKeyPress}
              />
              {errors.confirmpassword && (
                <small style={{ color: "red" }}>{errors.confirmpassword}</small>
              )}

              {error && <small style={{ color: "red" }}>{error}</small>}

              <br /><br />
              <button type="submit" className="registerbutton">
                Register
              </button>
            </form>

            <p className="existing-user">
              Already have an account?{" "}
              <Link
                to="/login"
                onMouseEnter={(e) => handleNavHover(e, "blue")}
                onMouseLeave={(e) => handleNavHover(e, "black")}
              >
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
