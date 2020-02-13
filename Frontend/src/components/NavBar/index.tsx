import React from "react";
import "./index.css";
import { UserBar } from "../";

interface NavProps {
  isLogin: boolean;
  username: string;
}

export default ({ isLogin, username }: NavProps) => {
  return (
    <div className="container">
      <div>
        <h3 className="logo">matcher</h3>
        <p className="home navBarItem">Home</p>
        <p className="aTask navBarItem">All Tasks</p>
        <p className="type navBarItem">Photo Types</p>
        {isLogin? <UserBar username = {username}/>: <button className="signIn">Sign in</button>}
        <hr className="slider" />
      </div>
    </div>
  );
};
