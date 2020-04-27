import React, { useContext, useEffect, useState, Fragment } from 'react';
import './index.scss';
import { Button } from '../';
import { AuthContext } from '../../context/AuthContext';
import { Link, useHistory } from 'react-router-dom';
import { whoami, logout } from '../../api/user';
import { Avatar, Menu, MenuItem } from '@material-ui/core';

const awesome = '/images/awesome.png';

export default (props: any) => {
    const { auth, authDispatch } = useContext(AuthContext);
    const [userBar, setUserBar] = useState({
        name: auth.firstname,
        isLogin: auth.isLogin,
    });

    const history = useHistory();

    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenuClick = (event: any) => {
        setAnchorEl(event.currentTarget);
    };
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        logout().then(() => {
            setUserBar({
                ...userBar,
                isLogin: false,
            });
            history.push('/');
        });
    }

    const handleRedirect = (to: string) => () => {
        handleMenuClose();
        history.push(to);
    }

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
                {userBar.isLogin ? <Fragment>
                    <Avatar src={awesome} onClick={handleMenuClick} />
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                    >
                        <MenuItem onClick={handleRedirect('/console?tab=profile')}>Profile</MenuItem>
                        <MenuItem onClick={handleRedirect('/console?tab=task')}>Your Tasks</MenuItem>
                        <MenuItem onClick={handleLogout}>Sign out</MenuItem>
                    </Menu>
                </Fragment>
                    : (
                        <Link to="/signin">
                            <Button type="outlined">Sign In</Button>
                        </Link>
                    )}
            </div>
        </div>
    );
};
