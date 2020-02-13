import React from "react";
import "./index.css";
import { UserBar } from "../";

interface NavProps {
  isLogin: boolean;
  Username: string;
}

export default ({ isLogin, Username }: NavProps) => {
  return (
    <div className="container">
      <div>
        <h3 className="logo">matcher</h3>
        <p className="home NavBarItem">Home</p>
        <p className="aTask NavBarItem">All Tasks</p>
        <p className="type NavBarItem">Photo Types</p>
        {isLogin? <UserBar Username = {Username}/>: <button className="signIn">Sign in</button>}
        <hr />
      </div>
    </div>
  );
};
