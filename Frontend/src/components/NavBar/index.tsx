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
        isLogin: auth.isLogin,
    });
    const history = useHistory();

    useEffect(() => {
        whoami()
            .then(profile => {
                authDispatch({ type: 'FETCH_AUTH_STATUS', payload: profile });
                setUserBar({
                    ...userBar,
                    name: profile.firstname,
                    isLogin: true,
                });
            })
            .catch(() => {
                console.log('Unauthenticated');
                setUserBar({
                    ...userBar,
                    isLogin: false,
                });
            });
    }, []);

    useEffect(() => {
        setUserBar({
            ...userBar,
            name: auth.firstname,
            isLogin: auth.isLogin,
        });
    }, [auth]);

    return (
        <div className="navBar">
            <Link to="/">
                <h3 className="logo">matcher</h3>
            </Link>

            <div className="navMenu">
                <Link to="/">
                    <h6 className="navBarItem">Home</h6>
                </Link>
                <Link className="aTask" to="/task">
                    <h6 className="navBarItem">All Tasks</h6>
                </Link>
                <Link className="type" to="/type">
                    <h6 className="navBarItem">Photo Types</h6>
                </Link>
            </div>

            <div className="NavBarUser">
                {userBar.isLogin ? (
                    <div className="dropdown">
                        <img className="navBarProfilePic" src={awesome} alt="awesome" width="18" height="18"></img>
                        <p className="dropButton">{userBar.name}</p>
                        <div className="dropdown-content">
                            <Link to="/console"><a>Profile</a></Link>
                            <Link to="/console/tasks"><a>Your Tasks</a></Link>
                            <a
                                href="/#"
                                onClick={() => {
                                    logout().then(() => {
                                        setUserBar({
                                            ...userBar,
                                            isLogin: false,
                                        });
                                        history.push('/');
                                    });
                                }}
                            >
                                Sign out
                            </a>
                        </div>
                    </div>
                ) : (
                    <Link to="/signin">
                        <Button type="outlined">Sign In</Button>
                    </Link>
                )}
            </div>
        </div>
    );
};
