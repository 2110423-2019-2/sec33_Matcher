import React, { useContext } from "react";
import "./index.css";
import { UserBar, Button } from "../";
import { AuthContext } from "../../context/AuthContext";

export default (props: any) => {
  const { auth } = useContext(AuthContext);
  return (
    <div className="navBar">
      <h3 className="logo">matcher</h3>
      <h6 className="home navBarItem">Home</h6>
      <h6 className="aTask navBarItem">All Tasks</h6>
      <h6 className="type navBarItem">Photo Types</h6>
      <div className="NavBarUser">
        {auth.isLogin ? (
          <UserBar username={auth.username} />
        ) : (
          <Button type="outlined">Sign In</Button>
        )}
      </div>
      <hr className="slider" />
    </div>
  );
};
