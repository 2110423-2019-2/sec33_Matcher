import React from "react";
import { NavBar, ComponentList } from "./components"
import "./index.scss";

const App: React.FC = () => {
  return (
    <div>
      <NavBar isLogin = {false} username = 'John Doe'/>
      {/* <Footer/> */}
      <ComponentList/>
    </div>
  );
};

export default App;
