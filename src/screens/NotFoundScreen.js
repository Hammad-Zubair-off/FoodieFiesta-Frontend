import React from "react";
import { Link } from "react-router-dom";
import "../styles/notFound.css";

const NotFoundScreen = () => {
  return (
    <div className="not-found-container">
      <div className="not-found-content">
        <h1>404</h1>
        <h2>Oops! Page Not Found</h2>
        <p>
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>
        <div className="not-found-actions">
          <Link
            to="/"
            className="btn btn-primary w-48 flex justify-center items-center text-center"
          >
            Go to Home
          </Link>
          <Link to="/menu" className="btn btn-secondary">
            View Menu
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundScreen;
