import React from "react";
import "./registerPage.css";
import { Link } from "react-router-dom";

function RegiserPage({ userName, setUserName }) {
  return (
    <div className="register-page">
      <div className="register-container">
        <div className="register-content">
          <h1>Memory Game</h1>
          <input
            className="register-input"
            type="text"
            placeholder="Username"
            onChange={(e) => {
              setUserName(e.target.value);
            }}
          />
          {userName.length > 3 && (
            <Link to="/Game">
              <button className="register-button">Start</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

export default RegiserPage;
