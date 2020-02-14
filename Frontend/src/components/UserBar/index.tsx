import React from "react";
import "./index.css";
import awesome from "../../assets/awesome.png"

interface UserProps {
    username: string
}

export default ({username}: UserProps) => {

  return (
      <div className="dropdown">
        
        <button className="dropButton"><img className="navBarProfilePic" src={awesome} alt="awesome"  width="30" height="30"></img>{username}</button>
          <div className="dropdown-content">
            <p>Profile</p>
            <p>Your Tasks</p>
            <p>Sign out</p>
          </div>
      </div>
  );
};

