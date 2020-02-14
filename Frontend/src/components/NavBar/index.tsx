import React from "react";
import "./index.css";
import { UserBar, Button } from "../";

interface NavProps {
  isLogin: boolean;
  username: string;
}

export default ({ isLogin, username }: NavProps) => {
  return (
    <div className="navBar">
      <div>
        <h3 className="logo">matcher</h3>
        <h6 className="home navBarItem">Home</h6>
        <h6 className="aTask navBarItem">All Tasks</h6>
        <h6 className="type navBarItem">Photo Types</h6>
        {isLogin? <UserBar username = {username}/>: <Button type="outlined">Sign In</Button>}
        <hr className="slider" />
      </div>
    </div>
  );
};
