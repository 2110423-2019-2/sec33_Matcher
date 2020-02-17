import React from "react";
import "./index.css";
import awesome from "../../assets/awesome.png"

interface UserProps {
    username: string
}

export default ({username}: UserProps) => {

  return (
      <div className="dropdown">
        <img className="navBarProfilePic" src={awesome} alt="awesome"  width="18" height="18"></img>
        <p className="dropButton">{username}</p>
          <div className="dropdown-content">
            <p>Profile</p>
            <p>Your Tasks</p>
            <p>Sign out</p>
          </div>
      </div>
  );
};

