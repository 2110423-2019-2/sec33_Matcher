import React, { useState } from 'react';
import './index.scss';
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import { AppleLogin, FacebookLogin, GmailLogin, ChevronRight, RegisterBackground, ChooseImage } from '../../assets';
import { NavBar, Footer, Input, Button } from '../../components';
import isEmail from 'validator/lib/isEmail';

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

    const validate = () => {
        setErrorText({
            ...errorText,
            email: '',
            passwordConfirm: '',
            password: '',
        });
        if (!isEmail(userInfo.email)) {
            setErrorText({
                ...errorText,
                email: 'Please input a proper email.',
            });
        }
        if (userInfo.password.length < 8) {
            setErrorText({
                ...errorText,
                password: 'Password must be longer than 8 character.',
            });
        }
        if (userInfo.password != userInfo.passwordConfirm) {
            setErrorText({
                ...errorText,
                passwordConfirm: 'Password confirmation must match the password entered.',
            });
        }
        // return true;
        // return false;
    };

    const handleChange = (field: string) => (e: any) => {
        setUserInfo({
            ...userInfo,
            [field]: e.target.value,
        });
        validate();
    };

    const handleCheck = (e: any) => {
        setUserInfo({
            ...userInfo,
            role: e.target.checked ? 'photographer' : 'customer',
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        // if (validate()) {
        //     console.log('success!');
        // }
    };

    return (
        <div className="row registerPage">
            <div className="col-6 hidden-sm">
                <RegisterBackground className="registerBackground" />
            </div>
            <div className="col-1" />
            <div className="col-4">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <h1 className="signInHeader">SIGN UP</h1>
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
                    <div className="row">
                        <div className="col-8 col-7-sm">
                            <p>
                                Already a member?{' '}
                                <a href="/#" className="signInLink">
                                    Sign In
                                </a>
                            </p>
                        </div>
                        <div className="col-4 col-5-sm right">
                            <Button type="invert">
                                <ChevronRight />
                            </Button>
                        </div>
                    </div>
                </form>
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
