import React from "react";
import { NavBarWithLogo } from "./components";
import { BodySignIn } from "./components";
import "./App.css";

const App: React.FC = () => {
  return (
    <div>
      <NavBarWithLogo />
      <BodySignIn Username = 'Email' Password = 'Password'/>
    </div>
  );
};

export default App;
