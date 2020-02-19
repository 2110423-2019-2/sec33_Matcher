import React from "react";
import "./index.scss";
import Checkbox, { CheckboxProps } from "@material-ui/core/Checkbox";
import { ReactComponent as AppleLogin } from "../../assets/AppleLogin.svg";
import { ReactComponent as FacebookLogin } from "../../assets/FacebookLogin.svg";
import { ReactComponent as GmailLogin } from "../../assets/GmailLogin.svg";
import { ReactComponent as ChevronRight } from "../../assets/icons/chevron-right.svg";
import { ReactComponent as RegisterBackground } from "../../assets/creating-photo.svg";
import { NavBar, Footer, Input, Button } from "../../components";

// const [checkedPhotographer, setCheckedPhotographer] = React.useState(false);

// const handleCheck = (field: boolean) => {

// }

export default () => {
  return (
    <div className="row registerPage">
      {/* <NavBar isLogin = {false} username = 'John Doe'/> */}
      <div className="col-6 hidden-sm">
        <RegisterBackground className="registerBackground" />
      </div>
      <div className="col-1" />
      <div className="col-4">
        <form>
          <div className="row">
            <div className="col-8">
              <h1 className="signInHeader">SIGN UP</h1>
              <div className="registerFormSection">
                <Input label="Firstname" variant="filled" fullWidth />
              </div>
              <div className="registerFormSection">
                <Input label="Lastname" variant="filled" fullWidth />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-12">
              <Input label="Email" variant="filled" fullWidth />
              <div className="registerFormSection">
                <Input label="Password" variant="filled" fullWidth />
              </div>
              <div className="registerFormSection">
                <Input label="Re-enter password" variant="filled" fullWidth />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-1 col-1-sm">
              <Checkbox
                // checked={checkedPhotographer}
                // onChange={handleCheck("checkedPhotographer")}
                value="checkedPhotographer"
              />
            </div>
            <div className="col-8 col-8-sm">
              <p className="checkBoxLabel">Sign up as a photographer</p>
            </div>
            <div className="col-3 col-3-sm">
              <hr className="checkBoxLine" />
            </div>
          </div>
          {/* Add National Card Image?? */}
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
