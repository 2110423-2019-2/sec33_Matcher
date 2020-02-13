import React from "react";
import "./index.css";

interface UserProps {
    Username: string
}

export default ({Username}: UserProps) => {

  return (
      <div className="dropdown">
        <button className="dropButton">{Username}</button>
          <div className="dropdown-content">
            <p>Profile</p>
            <p>Your Tasks</p>
            <p>Sign out</p>
          </div>
      </div>
  );
};

