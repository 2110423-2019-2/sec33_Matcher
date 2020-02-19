import React from "react";
import "./index.scss";
import { ReactComponent as RegisterBackground } from "../../assets/creating-photo.svg";
import { NavBar, Footer } from "../../components";


export default () => {
    return (
      <div className="row center registerPage">
        <NavBar isLogin = {false} username = 'John Doe'/>
        <div className="col-6">
          <RegisterBackground className="registerBackground" />
        </div>
        <div className="col-6">
          <div className="row center">
          {/* <Input label="Firstname" variant="filled" /> */}
          </div>
        </div>
        {/* <Footer/> */}
      </div>
    );
  };
  