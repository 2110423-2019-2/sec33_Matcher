import React, { useReducer } from "react";
import { NavBar, ComponentList } from "./components";
import { EditProfile } from "./pages";
import "./index.scss";
import {
  authReducer,
  defaultAuth,
  AuthContextProvider
} from "./context/AuthContext";
import Footer from "./components/Footer/Footer";

const App: React.FC = () => {
  const [auth, authDispatcher] = useReducer(authReducer, defaultAuth);
  return (
    <AuthContextProvider value={{ auth, authDispatcher }}>
      <div>
        <NavBar username={"John Doe"} isLogin={true} />
        {/* <Footer/> */}
        {/* <ComponentList /> */}
        <EditProfile />
        <Footer />
      </div>
    </AuthContextProvider>
  );
};

export default App;
