import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import IndexPage from "./components/IndexPage";
import LoginModal from "./components/LoginModal";
import CandidateHome from "./components/CandidateHome";
import "./styles.css";

const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = (email, password) => {
    // Implement login logic here
    console.log("Logging in with", email, password);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  return (
    <Router basename="/Worko-referral">
      <Routes>
        <Route path="/index" element={<IndexPage />} />
        <Route
          path="/login"
          element={
            loggedIn ? (
              <Navigate to="/candidate/home" />
            ) : (
              <LoginModal onLogin={handleLogin} />
            )
          }
        />
        <Route
          path="/candidate/home"
          element={
            loggedIn ? (
              <CandidateHome onLogout={handleLogout} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route path="/" element={<Navigate to="/index" />} />
      </Routes>
    </Router>
  );
};

export default App;
