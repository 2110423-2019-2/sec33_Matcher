import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Home } from "./pages";
import { NavBar, ComponentList } from "./components"
import "./index.css";
const App: React.FC = () => {
  return (
    <div>
      <NavBar isLogin = {true} username = 'John Doe'/>
      {/* <Footer/> */}
      <ComponentList/>
    </div>
  );
};

export default App;
