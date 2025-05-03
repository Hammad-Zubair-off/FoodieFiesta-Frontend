import React from "react";

export default function Error({ message }) {
  return (
    <div className="alert alert-danger text-center mt-3">
      <strong>Error:</strong> {message}
    </div>
  );
}
