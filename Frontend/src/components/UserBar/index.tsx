import React from 'react';
import './index.scss';
import { logout } from '../../api/user';
import { Link, useHistory } from 'react-router-dom';

const awesome = '/images/awesome.png';

interface UserProps {
    username: string;
}

export default ({ username }: UserProps) => {
    const history = useHistory();

    return (
        <div className="dropdown">
            <img className="navBarProfilePic" src={awesome} alt="awesome" width="18" height="18"></img>
            <p className="dropButton">{username}</p>
            <div className="dropdown-content">
                <Link to="/edit">
                    <a>Profile</a>
                </Link>
                <a>Your Tasks</a>
                <a
                    href="/#"
                    onClick={() => {
                        logout().then(() => history.push('/'));
                    }}
                >
                    Sign out
                </a>
            </div>
        </div>
    );
};
