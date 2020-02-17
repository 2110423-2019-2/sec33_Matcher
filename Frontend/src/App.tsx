import React from "react";
import { BodySignIn } from "./components";
import "./App.css";
import { NavBar, ComponentList } from "./components"
import "./index.scss";

const App: React.FC = () => {
  return (
    <div>
      {/* <NavBarWithLogo /> */}
      <BodySignIn Username = 'Email' Password = 'Password'/>
    </div>
  );
};

export default App;
