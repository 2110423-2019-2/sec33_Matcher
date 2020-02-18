import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Home } from "./pages";
import { NavBar, ComponentList } from "./components"
import "./index.scss";
const App: React.FC = () => {
  return (
    <div>

      <Home/>
    </div>
  );
};

export default App;
