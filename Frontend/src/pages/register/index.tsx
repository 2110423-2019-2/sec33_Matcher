import React, {useState} from "react";
import "./index.scss";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import {
  AppleLogin,
  FacebookLogin,
  GmailLogin,
  ChevronRight,
  RegisterBackground,
  ChooseImage
} from "../../assets";
import { NavBar, Footer, Input, Button } from "../../components";



export default () => {

  const [userInfo, setUserInfo] = useState({ email: '', password: '' , passwordConfirm: '', firstName: '', lastName: '', asPhotographer: false});

  const handleChange = (field: string) => (e: any) => {
    console.log(e.target.value)
    setUserInfo({
      ...userInfo,
      [field]: e.target.value
    })
  }

  const handleCheck = () => (e: any) => {
    console.log(e.target.value)
    setUserInfo({
      ...userInfo,
      ['asPhotographer']: e.target.checked
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault()
  }

  return (
    <div className="row registerPage">
      {/* <NavBar isLogin = {false} username = 'John Doe'/> */}
      <div className="col-6 hidden-sm">
        <RegisterBackground className="registerBackground" />
      </div>
      <div className="col-1" />
      <div className="col-4">
        <form onSubmit={handleSubmit}>
          <div className="row">
            <h1 className="signInHeader">SIGN UP</h1>
          </div>
          <div className="row" style={{ display: 'inline-flex'}}>
            <div className="col-6">
              <div className="row registerFormSection">
                <Input label="Firstname" variant="filled" onChange={handleChange('firstName')} type='text' fullWidth />
              </div>
              <div className="row registerFormSection">
                <Input label="Lastname" variant="filled" onChange={handleChange('lastName')} type='text' fullWidth />
              </div>
            </div>
            <div className="col-6 center chooseImg" style={{margin:'auto'}}>
              <div className="row">
                <ChooseImage className="registerChooseImg" />
                <p className="chooseImageTxt">Choose Image</p>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Input label="Email" variant="filled" onChange={handleChange('email')} type='email' fullWidth />
              <div className="registerFormSection">
                <Input label="Password" variant="filled" onChange={handleChange('password')} type='password' fullWidth />
              </div>
              <div className="registerFormSection">
                <Input label="Re-enter password" variant="filled" onChange={handleChange('passwordConfirm')} type='password' fullWidth />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-1 col-1-sm">
              <Checkbox
                onChange={handleCheck()}
              />
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
                Not a member?{" "}
                <a href="/#" className="signUpLink">
                  Sign Up
                </a>
              </p>
            </div>
            <div className="col-4 col-5-sm right loginButton">
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
      {/* <Footer/> */}
    </div>
  );
};
