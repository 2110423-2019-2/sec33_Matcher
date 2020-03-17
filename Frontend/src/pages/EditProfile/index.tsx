import React, { useContext, useState } from "react";
import "./index.scss";
import { Input, Button } from "../../components";
import { ReactComponent as Chevron } from "../../assets/icons/chevron-right.svg";
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";
import isEmail from 'validator/lib/isEmail';

export default () => {

  const { auth } = useContext(AuthContext);
  
  const [userInfo, setUserInfo] = useState({
    firstname: auth.firstname,
    lastname: auth.lastname,
    password: '',
    passwordConfirm: '',
    email: auth.email,
});
const [errorText, setErrorText] = useState({
  firstname: '',
  lastname: '',
  password: '',
  passwordConfirm: '',
  email: '',
});

const validate = () => {
  setErrorText({
      ...errorText,
      email: isEmail(userInfo.email) ? '' : 'Please input a proper email.',
      password: userInfo.password.length < 8 ? 'Password must no shorter than 8 character.' : '',
      passwordConfirm:
          userInfo.password == userInfo.passwordConfirm
              ? ''
              : 'Password confirmation must match the password entered.',
  });
  if (
      ((Boolean(errorText.password) == Boolean(errorText.email)) == Boolean(errorText.passwordConfirm)) ==
      false
  ) {
      return true;
  }
  return false;
};

  // const history = useHistory();

  const handleChange = (field: string) => (e: any) => {
    setUserInfo({
      ...userInfo,
      [field]: e.target.value
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validate()) {
      console.log(userInfo);
  }
};  

  return (
    <div className="editProfilePage">
    <div className="row editProfileTitle">
      <div className="col-3">
          <h4 className="editProfileHeader">Edit Profile</h4>
      </div>
    </div>
    <div className="row messageProfile">
      <div className="col-8">
        <p>You can edit your profile here. Click 'Save changes' after that.</p>
      </div>
    </div>
    <form onSubmit={handleSubmit}>
    <div className="row editProfileTitle">
      <div className="col-6">
        <Input variant="filled" onChange={handleChange('firstname')} type="text" label="Name" defaultValue={auth.firstname} fullWidth />
      </div>
      <div className="col-6">
        <Input variant="filled" onChange={handleChange('lastname')} type="text" label="Lastname" defaultValue={auth.lastname} fullWidth />
      </div>
    </div>
    <div className="row editProfileTitle">
      <div className="col-6">
        <Input 
        variant="filled" 
        onChange={handleChange('password')} 
        type='password' 
        label="Password" 
        error={Boolean(errorText.password)} 
        helperText={errorText.password} 
        fullWidth 
        />
      </div>
      <div className="col-6">
        <Input 
        variant="filled" 
        onChange={handleChange('passwordConfirm')} 
        type='password' 
        label="Re-enter password"
        error={Boolean(errorText.passwordConfirm)}
        helperText={errorText.passwordConfirm}        
        fullWidth 
        />
      </div>
    </div>
    <div className="row editProfileTitle">
      <div className="col-6">
        <Input 
        variant="filled" 
        onChange={handleChange('email')} 
        label="Email" 
        defaultValue={auth.email} 
        error={Boolean(errorText.email)}
        helperText={errorText.email}        
        fullWidth 
        />
      </div>
      <div className="col-6">
        <Button type="invert" fullWidth>Save Changes<Chevron style={{ strokeWidth: 1 }} />
        </Button>
      </div>
    </div>
    </form>
  </div>
  );
}; 