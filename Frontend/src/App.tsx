import React from "react";
import { NavBar } from "./components";
import "./App.css";


const App: React.FC = () => {
  return (
    <div>
      <NavBar isLogin = {false} Username = 'none'/>
    </div>
  );
};

export default App;
