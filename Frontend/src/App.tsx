import React from "react";
import { NavBar } from "./components"
import "./index.scss";

const App: React.FC = () => {
  return (
    <div>
      <NavBar isLogin = {false} username = 'John Doe'/>
      {/* <Footer/> */}
      <h1>WOW</h1>
    </div>
  );
};

export default App;
