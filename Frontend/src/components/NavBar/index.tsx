import React, { useContext, useEffect } from 'react';
import './index.scss';
import { UserBar, Button } from '../';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { whoami } from '../../api/user';

export default (props: any) => {

    const { auth, authDispatcher } = useContext(AuthContext);

    useEffect(() => {
        whoami()
            .then(profile => authDispatcher({ type: 'FETCH_AUTH_STATUS', payload: profile }))
            .catch(() => console.log('Unauthenticated'));
    }, []);

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
                {auth.isLogin ? (
                    <UserBar username={auth.username} />
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
