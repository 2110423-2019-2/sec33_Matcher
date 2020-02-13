import React from "react";
import { NavBar , Footer } from "./components"
import "./index.scss";

const App: React.FC = () => {
  return (
    <div>
      <NavBar isLogin = {true} Username = 'John Doe'/>
      {/* <Footer/> */}
      <h1>WOW</h1>
    </div>
  );
};

export default App;
