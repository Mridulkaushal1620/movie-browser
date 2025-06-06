import React from "react";

export const Button = ({ className = "", children, ...props }) => (
  <button
    className={`bg-blue-600  px-4 py-2 rounded hover:bg-blue-700 ${className}`}
    {...props}
  >
    {children}
  </button>
);
