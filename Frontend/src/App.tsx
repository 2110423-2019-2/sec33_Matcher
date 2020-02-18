import React, { useReducer, useContext } from "react";
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
    <AuthContextProvider value={{ auth, authDispatcher }}>
      <div>
        <NavBar username="John Doe" />
        {/* <Footer/> */}
        <ComponentList />
      </div>
    </AuthContextProvider>
  );
};

export default App;
