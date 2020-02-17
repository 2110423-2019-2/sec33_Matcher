import React from "react";
import { NavBar, ComponentList } from "./components"
import "./index.scss";

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
