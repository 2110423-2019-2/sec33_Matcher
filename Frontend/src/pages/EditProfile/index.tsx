import React, { useContext, useState } from "react";
import "./index.scss";
import { Input, Button } from "../../components";
import { ReactComponent as Chevron } from "../../assets/icons/chevron-right.svg";
import { Link, useHistory } from 'react-router-dom';
import { AuthContext } from "../../context/AuthContext";

export default () => {

  const { auth } = useContext(AuthContext);
  
  const [userInfo, setUserInfo] = useState({
    name: '',
    surname: '',
    password: '',
    re_password: '',
    email: '',
});
  // const history = useHistory();

  const handleChange = (field: string) => (e: any) => {
    setUserInfo({
      ...userInfo,
      [field]: e.target.value
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('done!')
};  

  return (
    <div className="editProfilePage">
    <div className="row editProfileTitle">
      <div className="col-3">
          <h4 className="editProfileHeader">Create Task</h4>
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
        <Input variant="filled" onChange={handleChange('name')} label="Name" defaultValue={auth.username} fullWidth />
      </div>
      <div className="col-6">
        <Input variant="filled" onChange={handleChange('surname')} label="Surname" defaultValue={auth.username} fullWidth />
      </div>
    </div>
    <div className="row editProfileTitle">
      <div className="col-6">
        <Input variant="filled" onChange={handleChange('password')} type='password' label="Password" fullWidth />
      </div>
      <div className="col-6">
        <Input variant="filled" onChange={handleChange('re_password')} type='password' label="Re-enter password" fullWidth />
      </div>
    </div>
    <div className="row editProfileTitle">
      <div className="col-6">
        <Input variant="filled" onChange={handleChange('email')} label="Email" defaultValue={auth.username} fullWidth />
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