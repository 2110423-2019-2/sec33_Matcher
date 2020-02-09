import React from "react";
import Pic from "./loginPic.png";
import Or from "./Sign in - or.png";
import Login from "../../assets/LoginButton.png";
import Apple from "../../assets/AppleLogin.png";
import Facebook from "../../assets/FacebookLogin.png";
import Gmail from "../../assets/GmailLogin.png";
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import "./index.css";


interface  loginProps {
    Username: string,
    Password: string
  }

function onClickSignUp(){
  console.log('ClickSignUp');
}

function onClickLogin(){
  console.log('ClickLogin');
}

  export default ({ Username, Password}: loginProps) => {

    return (
      <div>
        <h1><img src={Pic} alt="login logo" /></h1>
        <label className="SignIn">SIGN IN</label>
        
        <div><TextField className="email" id="standard-basic" label="Email" /></div>
        <div><TextField className="password" id="filled-password-input" label="Password" type="password" variant="filled" /></div>
        <div><Typography><label className="signUp">Not a member? </label><Link className="linkSignUp" href="#" onClick={onClickSignUp}>Sign up</Link></Typography></div>
        <img className="signInOr" src={Or} alt="Sign in - or" />
        <button className='loginButton' onClick={onClickLogin}>
          <img src={Login} alt="Login Button" />
        </button>
        <button className='appleSignIn'>
          <img src={Apple} alt="Login Button" />
        </button>    
        <button className='facebookSignIn'>
          <img src={Facebook} alt="Login Button" />
        </button> 
        <button className='gmailSignIn'>
          <img src={Gmail} alt="Login Button" />
        </button>                            
      </div>  
    );
  };  