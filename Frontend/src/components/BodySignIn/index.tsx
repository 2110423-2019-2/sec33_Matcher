import React, { useState } from "react";
import { ReactComponent as LoginBackground } from "../../assets/organize-photo.svg";
import { ReactComponent as AppleLogin } from "../../assets/AppleLogin.svg";
import { ReactComponent as FacebookLogin } from "../../assets/FacebookLogin.svg";
import { ReactComponent as GmailLogin } from "../../assets/GmailLogin.svg";
import { Input, Button } from "..";
import isEmail from 'validator/lib/isEmail';
import "./index.scss";

export default () => {
  const [userCred, setUserCred] = useState({ email: '', password: '' });
  const [errorText, setErrorText] = useState<boolean | string>(false);

  const validate = () => {
    if (!isEmail(userCred.email)) return false;
    return true;
  }

  const handleChange = (field: string) => (e: any) => {
    setUserCred({
      ...userCred,
      [field]: e.target.value
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (validate()) {
      console.log(userCred)
      setErrorText(false);
    } else {
      setErrorText('Email is invalid');
    }
  }

  return (
    <div className="row">
      <div className="col-6 hidden-sm">
        <LoginBackground className="loginBackground" />
      </div>
      <div className="col-1" />
      <div className="col-4">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-12">
              <h1 className="signInHeader">SIGN IN</h1>
              <div className="loginFormSection">
                <Input 
                  label="Email" 
                  variant="filled" 
                  onChange={handleChange('email')} 
                  error={Boolean(errorText)}
                  helperText={errorText}  
                />
              </div>
              <div className="loginFormSection">
                <Input label="Password" variant="filled" onChange={handleChange('password')} type="password" />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-8 col-7-sm">
              <p>Not a member? <a href="/#" className="signUpLink">Sign Up</a></p>
            </div>
            <div className="col-4 col-5-sm right loginButton">
              <Button type="invert">></Button>
            </div>
          </div>
        </form>
        <div className="row center">
          <div className="col-5 col-5-sm"><hr /></div>
          <div className="col-2 col-2-sm center">Or</div>
          <div className="col-5 col-5-sm"><hr /></div>
        </div>
        <div className="row altSignin center">
          <div className="col-8 col-12-sm"><AppleLogin /></div>
          <div className="col-2 col-6-sm"><FacebookLogin /></div>
          <div className="col-2 col-6-sm"><GmailLogin /></div>
        </div>
      </div>
    </div>
  );
};  