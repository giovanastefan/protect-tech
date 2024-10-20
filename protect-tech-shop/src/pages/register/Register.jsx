import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Button } from "../../components/button/Button";
import { Input } from "../../components/input/Input";
import "./Register.css";
import { registerUser } from "../../services/authService";

export const Register = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({
      ...profile,
      [name]: value,
    });
  };

  const handleRegister = async () => {
    setMessage("");

    if (
      !profile.firstName ||
      !profile.lastName ||
      !profile.email ||
      !profile.password
    ) {
      setMessage("All fields are required.");
      return;
    }

    // A02 Fail - Weak Password Policy: There are no checks in place to enforce a strong password policy.
    // Users can register with weak passwords that do not meet security standards. It is essential to
    // implement password requirements such as:
    // - Minimum length of 8 characters
    // - At least one uppercase letter
    // - At least one lowercase letter
    // - At least one number
    // - At least one special character
    // Implementing these requirements helps ensure that user passwords are complex enough to resist brute-force
    // attacks and enhances overall application security.

    try {
      const userResponse = await registerUser(profile);
      console.log("User created successful:", userResponse);

      setMessage("Account created successfully!");
      setProfile({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
      navigate("/login");
    } catch (err) {
      setMessage(
        "Failed to create an account. Please check the information provided.",
        err.message
      );
    }
  };

  return (
    <div className="login-container">
      <div className="login-content">
        {message && (
          <div className="message">
            <p>{message}</p>
          </div>
        )}
        <h1>Sign Up</h1>
        <div className="input-container">
          <Input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={profile.firstName}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={profile.lastName}
            onChange={handleInputChange}
          />
          <Input
            type="email"
            name="email"
            placeholder="E-mail"
            value={profile.email}
            onChange={handleInputChange}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={profile.password}
            onChange={handleInputChange}
          />
          <div className="terms-container">
            <input type="checkbox" className="terms-checkbox" id="terms" />
            <span htmlFor="terms">Accept all terms & Conditions</span>
          </div>
        </div>
        <Button onClickButton={handleRegister}>Create Account</Button>
        <p>
          Already have an account? <NavLink to="/login">Login</NavLink>
        </p>
      </div>
    </div>
  );
};
