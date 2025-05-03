import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Spinner } from "react-bootstrap";
import { FaUser } from "react-icons/fa";
import "../styles/ProfileScreen.css";

export default function ProfileScreen() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="profile-container d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (!user) {
    navigate("/login");
    return null;
  }

  const getInitials = (name) => {
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="profile-container">
      <div className="row justify-content-center w-100">
        <div className="col-sm-9 col-md-7 col-lg-5">
          <div className="profile-card">
            <div className="card-body p-4 p-sm-5">
              <div className="profile-header">
                <div className="profile-avatar">{getInitials(user.name)}</div>
                <h1 className="profile-title">Profile Information</h1>
                <p className="profile-subtitle">Your account details</p>
              </div>

              <div className="info-section">
                <div className="info-item">
                  <div className="info-label">
                    <FaUser className="info-icon" />
                    Username
                  </div>
                  <div className="info-value">{user.name}</div>
                </div>

                <div className="info-item">
                  <div className="info-label">
                    <FaUser className="info-icon" />
                    Member Since
                  </div>
                  <div className="info-value">
                    {new Date(user.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
