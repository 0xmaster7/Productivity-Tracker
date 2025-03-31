import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import "./style.css";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    password: "",
  });

  const [error, setError] = useState("");

  const navigate = useNavigate(); // Initialize useNavigate

  // Password validation function
  const validatePassword = (password) => {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  // Handle input change
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });

    // Password validation
    if (name === "password") {
      setErrors({
        ...errors,
        password: validatePassword(value)
          ? ""
          : "Password must be 8+ chars, include a number, uppercase, and special character.",
      });
    }
  };

  // Handle login form submission
  const handleLogin = async (event) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      setError("Email and password are required.");
      return;
    }

    if (errors.password) {
      setError("Fix password errors before logging in.");
      return;
    }

    try {
      // Fetch users from the JSON server
      const response = await fetch("http://localhost:3000/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users.");
      }

      const users = await response.json();

      // Check if the user exists with matching email and password
      const user = users.find(
        (u) =>
          u.email === formData.email && u.password === formData.password
      );

      if (user) {
        alert("Login successful!");
        console.log("User logged in:", user);
        setError("");

        // ✅ Store userEmail and userId in localStorage dynamically
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("userId", user.id);

        // Redirect to another page (e.g., /dashboard)
        navigate("/dashboard"); // Redirect using useNavigate
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while logging in. Please try again later.");
    }
  };

  // Handle Enter key press for login
  const handleKeyPress = (event, action) => {
    if (event.key === "Enter") {
      action(event);
    }
  };

  // Handle navigation hover effect
  const handleNavHover = (event, color) => {
    event.target.style.color = color;
  };

  return (
    <div className="main-wrapper">
      <div className="container">
        <div className="left-content">
          Welcome Back! <br />
          <span style={{ fontSize: "20px", fontWeight: "normal" }}>
            Sign in to continue your journey.
          </span>
        </div>

        <div className="divider"></div>

        <div className="logincontainer">
          <div className="login">
            <h1>Login</h1>
            <form onSubmit={handleLogin}>
              <p>Email</p>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                value={formData.email}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyPress(e, handleLogin)}
              />

              <p>
                <br />
                Password
              </p>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                required
                value={formData.password}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyPress(e, handleLogin)}
              />
              {errors.password && (
                <small style={{ color: "red" }}>{errors.password}</small>
              )}

              {error && <small style={{ color: "red" }}>{error}</small>}

              <br />
              <br />
              <button type="submit" className="loginbutton">
                Login
              </button>
            </form>

            <p className="new-user">
              Don't have an account?{" "}
              <Link
                to="/register"
                onMouseEnter={(e) => handleNavHover(e, "blue")}
                onMouseLeave={(e) => handleNavHover(e, "black")}
              >
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
