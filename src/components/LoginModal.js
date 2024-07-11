import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const LoginModal = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    onLogin(email, password);
    navigate("/candidate/home");
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    </div>
  );
};

export default LoginModal;
