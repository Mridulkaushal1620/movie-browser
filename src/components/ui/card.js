import React from "react";

export const Card = ({ className = "", children }) => (
  <div className={`bg-white rounded shadow ${className}`}>
    {children}
  </div>
);

export const CardContent = ({ className = "", children }) => (
  <div className={`p-4 ${className}`}>
    {children}
  </div>
);
