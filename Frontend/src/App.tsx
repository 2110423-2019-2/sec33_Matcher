import React, { useReducer } from "react";
import { BodySignIn } from "./pages";
import "./App.css";
import { NavBar, ComponentList } from "./components";
import "./index.scss";
import {
  authReducer,
  defaultAuth,
  AuthContextProvider
} from "./context/AuthContext";

const App: React.FC = () => {
  const [auth, authDispatcher] = useReducer(authReducer, defaultAuth);
  return (
    <div>
      <NavBar isLogin={false} username="John Doe" />
      <BodySignIn />
    </div>
  );
};

export default App;
