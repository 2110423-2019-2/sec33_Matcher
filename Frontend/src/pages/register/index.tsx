import React from "react";
import "./index.scss";
import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox';
import { ReactComponent as RegisterBackground } from "../../assets/creating-photo.svg";
import { NavBar, Footer, Input, Button } from "../../components";

// const [checkedPhotographer, setCheckedPhotographer] = React.useState(false);

// const handleCheck = (field: boolean) => {

// }

export default () => {
  return (
    <div className="row registerPage">
      {/* <NavBar isLogin = {false} username = 'John Doe'/> */}
      <div className="col-6">
        <RegisterBackground className="registerBackground" />
      </div>
      <div className="col-1" />
      <div className="col-4">
        <form>
          <div className="row">
            <div className="col-8">
              <h1 className="signInHeader">SIGN IN</h1>
              <Input label="Firstname" variant="filled" fullWidth />
              <Input label="Lastname" variant="filled" fullWidth />
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Input label="Email" variant="filled" fullWidth />
              <Input label="Password" variant="filled" fullWidth />
              <Input label="Re-enter password" variant="filled" fullWidth />
          
              <div className="col-2">
                  <Checkbox
                    // checked={checkedPhotographer}
                    // onChange={handleCheck("checkedPhotographer")}
                    value="checkedPhotographer"
                  />
              </div>
                  <p>asdf</p>
             
            </div>
          </div>
        </form>
      </div>
      {/* <Footer/> */}
    </div>
  );
};
