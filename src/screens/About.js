import React, { useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  const callAboutPage = useCallback(async () => {
    try {
      const res = await fetch("/about", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Unauthorized Access");
      }
    } catch (err) {
      console.error("Error:", err.message);
      navigate("/Loginscreen");
    }
  }, [navigate]);

  useEffect(() => {
    callAboutPage();
  }, [callAboutPage]);

  return (
    <div>
      <h1>About</h1>
    </div>
  );
}
