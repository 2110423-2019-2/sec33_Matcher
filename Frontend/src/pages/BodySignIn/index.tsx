import React, { useState, useContext } from 'react';
import { ReactComponent as LoginBackground } from '../../assets/organize-photo.svg';
import { ReactComponent as AppleLogin } from '../../assets/AppleLogin.svg';
import { ReactComponent as FacebookLogin } from '../../assets/FacebookLogin.svg';
import { ReactComponent as GmailLogin } from '../../assets/GmailLogin.svg';
import { ReactComponent as ChevronRight } from '../../assets/icons/chevron-right.svg';
import { Input, Button } from '../../components/';
import { AuthContext } from '../../context/AuthContext';
import isEmail from 'validator/lib/isEmail';
import './index.scss';
import { Link, useHistory } from 'react-router-dom';
import { login, whoami } from '../../api/user';

export default () => {
    const [userCred, setUserCred] = useState({ email: '', password: '' });
    const [errorText, setErrorText] = useState<boolean | string>(false);
    const history = useHistory();
    const { authDispatch } = useContext(AuthContext);

    const validate = () => {
        if (!isEmail(userCred.email)) return false;
        return true;
    };

    const handleChange = (field: string) => (e: any) => {
        setUserCred({
            ...userCred,
            [field]: e.target.value,
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (validate()) {
            setErrorText(false);
            login(userCred)
                .then(() => {
                    whoami()
                        .then(profile => {
                            authDispatch({ type: 'FETCH_AUTH_STATUS', payload: profile });
                            history.push('/');
                        })
                        .catch(() => {
                            console.log('Unauthenticated');
                        });
                })
                .catch((error) => {
                    setErrorText(error.response.data.message);
                });
        } else {
            setErrorText('Email or Password is invalid');
        }
    };

    return (
        <div className="row siginContainer">
            <div className="col-6 hidden-sm">
                <LoginBackground className="loginBackground" />
            </div>
            <div className="col-1" />
            <div className="col-4 signinForm">
                <div className="row">
                    <div className="col-12">
                        <h2 className="signInHeader">SIGN IN</h2>
                        <div className="loginFormSection">
                            <Input
                                label="Email"
                                variant="filled"
                                onChange={handleChange('email')}
                                error={Boolean(errorText)}
                                helperText={errorText}
                                fullWidth
                            />
                        </div>
                        <div className="loginFormSection">
                            <Input
                                label="Password"
                                variant="filled"
                                onChange={handleChange('password')}
                                type="password"
                                fullWidth
                            />
                        </div>
                    </div>
                </div>
                <div className="row signinFlex">
                    <div className="col-8 col-7-sm">
                        <p>
                            Not a member?{' '}
                            <Link to="/register">
                                <span className="signUpLink">Sign Up</span>
                            </Link>
                        </p>
                    </div>
                    <div className="col-4 col-5-sm right loginButton">
                        <Button type="invert" onClick={handleSubmit}>
                            <ChevronRight />
                        </Button>
                    </div>
                </div>
                <div className="row center orLine signinFlex">
                    <div className="col-5 col-5-sm">
                        <hr />
                    </div>
                    <div className="col-2 col-2-sm center">Or</div>
                    <div className="col-5 col-5-sm">
                        <hr />
                    </div>
                </div>
                <div className="row altSignin center">
                    <AppleLogin />
                    <FacebookLogin />
                    <GmailLogin />
                </div>
                <div className="blankSpace"></div>
            </div>
        </div>
    );
};
