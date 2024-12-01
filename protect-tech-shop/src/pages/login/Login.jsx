import React, { useState } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { Button } from "../../components/button/Button";
import { Input } from "../../components/input/Input";
import { loginUser } from "../../services/authService";
import { useAuth } from "../../contexts/authProvider";
import "./Login.css";

export const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");
    try {
      const userResponse = await loginUser({ email, password });
      console.log("Login successful:", userResponse);
      
      login({...userResponse.user.userData});

      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div>
      <div className="login-container">
        <div className="login-content">
          {error && (
            <div className="error-message">
              <p>{error}</p>
            </div>
          )}
          <h1>Sign In</h1>
          <div className="input-container">
            <Input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button onClickButton={handleLogin}>Login</Button>
          <NavLink to="/register">Don't have an account? Register</NavLink>
        </div>
      </div>
    </div>
  );
};
