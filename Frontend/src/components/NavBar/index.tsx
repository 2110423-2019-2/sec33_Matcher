import React, { useContext, useEffect } from "react";
import "./index.css";
import { UserBar, Button } from "../";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { whoami } from "../../api/user";

export default (props: any) => {
  const { auth, authDispatcher } = useContext(AuthContext);

  useEffect(() => {
    whoami()
      .then(profile => authDispatcher({ type: 'FETCH_AUTH_STATUS', payload: profile }))
      .catch(() => console.log('Unauthenticated'))
  }, [])

  return (
    <div className="navBar">
      <Link to='/'>
        <h3 className="logo">matcher</h3>
        <h6 className="navHome navBarItem">Home</h6>
      </Link>
      <h6 className="aTask navBarItem">All Tasks</h6>
      <h6 className="type navBarItem">Photo Types</h6>
      <div className="NavBarUser">
        {auth.isLogin ? (
          <UserBar username={auth.username} />
        ) : (
          <Link to='/signin'>
            <Button type="outlined">Sign In</Button>
          </Link>
        )}
      </div>
      {auth.isLogin ? (
          <hr className="slider" />
        ) : (
          <hr className="sliderB" />
        )}
      
    </div>
  );
};
