import React, { useState, useContext } from 'react';
import './index.scss';
import Checkbox from '@material-ui/core/Checkbox';
import { AppleLogin, FacebookLogin, GmailLogin, ChevronRight, RegisterBackground, ChooseImage } from '../../assets';
import { Input, Button } from '../../components';
import isEmail from 'validator/lib/isEmail';
import { Link, useHistory } from 'react-router-dom';
import { register, login, whoami } from '../../api/user';
import { AuthContext } from '../../context/AuthContext';

export default () => {
    const [userInfo, setUserInfo] = useState({
        email: '',
        password: '',
        passwordConfirm: '',
        firstname: '',
        lastname: '',
        role: 'customer',
    });
    const [errorText, setErrorText] = useState({
        email: '',
        password: '',
        passwordConfirm: '',
        firstname: '',
        lastname: '',
    });
    const history = useHistory();
    const { authDispatch } = useContext(AuthContext);
    const validate = () => {
        setErrorText({
            ...errorText,
            email: isEmail(userInfo.email) ? '' : 'Please input a proper email.',
            password: userInfo.password.length < 8 ? 'Password must no shorter than 8 character.' : '',
            passwordConfirm:
                userInfo.password === userInfo.passwordConfirm
                    ? ''
                    : 'Password confirmation must match the password entered.',
        });
        if (userInfo.password.length < 8) return false;
        if (!isEmail(userInfo.email)) return false;
        if (userInfo.password !== userInfo.passwordConfirm) return false;
        return true;
    };

    const handleChange = (field: string) => (e: any) => {
        setUserInfo({
            ...userInfo,
            [field]: e.target.value,
        });
    };

    const handleCheck = (e: any) => {
        setUserInfo({
            ...userInfo,
            role: e.target.checked ? 'photographer' : 'customer',
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        if (validate()) {
            try {
                const registerResponse = await register(userInfo)
                if (registerResponse.status === 200) {
                    const loginResponse = await login({ email: userInfo.email, password: userInfo.password });
                    if (loginResponse.status === 200) {
                        const profile = await whoami();
                        authDispatch({ type: 'FETCH_AUTH_STATUS', payload: profile });
                        history.push('/');
                    }
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    return (
        <div className="row registerPage">
            <div className="col-6 hidden-sm">
                <RegisterBackground className="registerBackground" />
            </div>
            <div className="col-1" />
            <div className="col-4">
                <div className="row">
                    <h1 className="signUpHeader">SIGN UP</h1>
                </div>
                <div className="row" style={{ display: 'inline-flex' }}>
                    <div className="col-6">
                        <div className="row registerFormSection">
                            <Input
                                label="Firstname"
                                variant="filled"
                                onChange={handleChange('firstname')}
                                type="text"
                                fullWidth
                            />
                        </div>
                        <div className="row registerFormSection">
                            <Input
                                label="Lastname"
                                variant="filled"
                                onChange={handleChange('lastname')}
                                type="text"
                                fullWidth
                            />
                        </div>
                    </div>
                    <div className="col-6 center chooseImg" style={{ margin: 'auto' }}>
                        <div className="row">
                            <ChooseImage className="registerChooseImg" />
                            <p className="chooseImageTxt">Choose Image</p>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Input
                            label="Email"
                            variant="filled"
                            onChange={handleChange('email')}
                            error={Boolean(errorText.email)}
                            helperText={errorText.email}
                            fullWidth
                        />
                        <div className="registerFormSection">
                            <Input
                                label="Password"
                                variant="filled"
                                onChange={handleChange('password')}
                                type="password"
                                error={Boolean(errorText.password)}
                                helperText={errorText.password}
                                fullWidth
                            />
                        </div>
                        <div className="registerFormSection">
                            <Input
                                label="Re-enter password"
                                variant="filled"
                                onChange={handleChange('passwordConfirm')}
                                type="password"
                                error={Boolean(errorText.passwordConfirm)}
                                helperText={errorText.passwordConfirm}
                                fullWidth
                            />
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-1 col-1-sm">
                        <Checkbox onChange={handleCheck} />
                    </div>
                    <div className="col-8 col-8-sm">
                        <p className="checkBoxLabel">Sign up as a photographer</p>
                    </div>
                    <div className="col-3 col-3-sm">
                        <hr className="checkBoxLine" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Input label="National Card Image" variant="filled" fullWidth />
                    </div>
                </div>
                <div className="row signupBtn">
                    <div className="col-8 col-7-sm">
                        <p>
                            Already a member?{' '}
                            <Link to="/signin">
                                <span className="signInLink">Sign In</span>
                            </Link>
                        </p>
                    </div>
                    <div className="col-4 col-5-sm right">
                        <Button onClick={handleSubmit} type="invert">
                            <ChevronRight />
                        </Button>
                    </div>
                </div>
                <div className="row center">
                    <div className="col-5 col-5-sm">
                        <hr />
                    </div>
                    <div className="col-2 col-2-sm center">Or</div>
                    <div className="col-5 col-5-sm">
                        <hr />
                    </div>
                </div>
                <div className="row altSignin center">
                    <div className="col-8 col-12-sm">
                        <AppleLogin />
                    </div>
                    <div className="col-2 col-6-sm">
                        <FacebookLogin />
                    </div>
                    <div className="col-2 col-6-sm">
                        <GmailLogin />
                    </div>
                </div>
            </div>
        </div>
    );
};
