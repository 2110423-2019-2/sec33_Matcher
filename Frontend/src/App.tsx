import React from "react";
import { NavBar } from "./components";
import "./App.css";


const App: React.FC = () => {
  return (
    <div>
      <NavBar isLogin = {true} Username = 'John Doe'/>
    </div>
  );
};

export default App;
