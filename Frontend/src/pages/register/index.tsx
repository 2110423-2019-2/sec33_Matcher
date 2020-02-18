import React from "react";
import "./index.scss";
import { NavBar } from "../../components";


export default () => {
    return (
      <div className="navBar">
        <h3 className="logo">matcher</h3>
        <h6 className="home navBarItem">Home</h6>
        <h6 className="aTask navBarItem">All Tasks</h6>
        <h6 className="type navBarItem">Photo Types</h6>
        <div className="NavBarUser">
          {isLogin ? (
            <UserBar username={username} />
          ) : (
            <Button type="outlined">Sign In</Button>
          )}
        </div>
        <hr className="slider" />
      </div>
    );
  };
  