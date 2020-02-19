import React from "react";
import { ReactComponent as LoginBackground } from "../../assets/organize-photo.svg";
import { ReactComponent as AppleLogin } from "../../assets/AppleLogin.svg";
import { ReactComponent as FacebookLogin } from "../../assets/FacebookLogin.svg";
import { ReactComponent as GmailLogin } from "../../assets/GmailLogin.svg"; 
import { Input, Button } from "..";
import "./index.scss";

export default () => {

  return (
    <div className="row">
      <div className="col-6 hidden-sm">
        <LoginBackground className="loginBackground" />
      </div>
      <div className="col-1" />
      <div className="col-4">
        <div className="row">
          <div className="col-12">
            <h1 className="signInHeader">SIGN IN</h1>
            <div className="loginFormSection">
              <Input label="Email" variant="filled" />
            </div>
            <div className="loginFormSection">
              <Input label="Password" variant="filled" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-8 col-7-sm">
            <p>Not a member? <a href="/#" className="signUpLink">Sign Up</a></p>
          </div>
          <div className="col-4 col-3-sm right loginButton">
            <Button type="invert">></Button>
          </div>
        </div>
        <div className="row center">
          <div className="col-5 col-4-sm"><hr /></div>
          <div className="col-2 col-1-sm center">Or</div>
          <div className="col-5 col-4-sm"><hr /></div>
        </div>
        <div className="row altSignin">
          <div className="col-8 col-6-sm"><AppleLogin /></div>
          <div className="col-2 col-1-sm"><FacebookLogin /></div>
          <div className="col-2 col-1-sm"><GmailLogin /></div>
        </div>
      </div>
    </div>
  );
};  