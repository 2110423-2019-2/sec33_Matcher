import React, { useContext, useEffect, useState } from 'react';
import './index.scss';
import { Button } from '../';
import { AuthContext } from '../../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { whoami, logout } from '../../api/user';

const awesome = '/images/awesome.png';

export default (props: any) => {

    const { auth, authDispatch } = useContext(AuthContext);
    const [userBar, setUserBar] = useState({
        name: auth.firstname,
        isLogin: auth.isLogin
    });
    const history = useHistory();


    useEffect(() => {
        whoami()
            .then(profile => authDispatch({ type: 'FETCH_AUTH_STATUS', payload: profile }))
            .catch(() => console.log('Unauthenticated'));     
    }, []);
    setUserBar({
        ...userBar,
        name: auth.firstname,
        isLogin: auth.isLogin,
    });

    return (
        <div className="navBar">
            <Link to="/">
                <h3 className="logo">matcher</h3>
                <h6 className="navHome navBarItem">Home</h6>
            </Link>
            <Link className="aTask" to="/task">
                <h6 className="navBarItem">All Tasks</h6>
            </Link>
            <Link className="type" to="/type">
                <h6 className="navBarItem">Photo Types</h6>
            </Link>
            <div className="NavBarUser">
                {userBar.isLogin ? (
                    <div className="dropdown">
                    <img
                      className="navBarProfilePic"
                      src={awesome}
                      alt="awesome"
                      width="18"
                      height="18"
                    ></img>
                    <p className="dropButton">{userBar.name}</p>
                    <div className="dropdown-content">
                      <Link to='/edit'><a>Profile</a></Link>
                      <a>Your Tasks</a>
                      <a href='/#' onClick={() => { 
                        logout()
                          .then(() => history.push('/')) 
                      }}>Sign out</a>
                    </div>
                  </div>
                ) : (
                    <Link to="/signin">
                        <Button type="outlined">Sign In</Button>
                    </Link>
                )}
            </div>
            <hr className={`${auth.isLogin ? 'slider' : 'sliderB'}`} />
        </div>
    );
};