import React from "react";
import { NavBarWithLogo } from "./components";
import "./App.css";


const App: React.FC = () => {
  return (
    <div>
      <NavBarWithLogo isLogin = {false} Username = 'none'/>
    </div>
  );
};

export default App;
