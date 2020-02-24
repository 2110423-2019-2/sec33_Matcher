import React from "react";
import { BodySignIn, Tasks } from "./pages";
import "./App.css";
import { NavBar, ComponentList, Footer } from "./components";
import "./index.scss";

const App: React.FC = () => {
  return (
    <div>
      <NavBar isLogin={false} username="John Doe" />
      <Tasks />
      <Footer />
    </div>
  );
};

export default App;
