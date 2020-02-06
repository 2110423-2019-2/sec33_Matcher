import React from "react";
import { NavBarWithLogo, Footer } from "./components";
import "./App.css";

const App: React.FC = () => {
  return (
    <div>
      <NavBarWithLogo />
      <Footer />
    </div>
  );
};

export default App;
