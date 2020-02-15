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
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
      <Home />
    </div>
  );
};

export default App;
