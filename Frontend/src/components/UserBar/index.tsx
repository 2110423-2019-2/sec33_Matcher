import React from "react";
import "./index.css";

interface UserProps {
    username: string
}

export default ({username}: UserProps) => {

  return (
      <div className="dropdown">
        <button className="dropButton">{username}</button>
          <div className="dropdown-content">
            <p>Profile</p>
            <p>Your Tasks</p>
            <p>Sign out</p>
          </div>
      </div>
  );
};

