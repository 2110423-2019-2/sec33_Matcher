import React, { useReducer } from "react";
import { BodySignIn } from "./pages";
import "./App.css";
import { NavBar, ComponentList, PrivateRoute } from "./components";
import "./index.scss";
import {
  authReducer,
  defaultAuth,
  AuthContextProvider
} from "./context/AuthContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
const App: React.FC = () => {
  const [auth, authDispatcher] = useReducer(authReducer, defaultAuth);
  return (
    <Router>
      <AuthContextProvider value={{ auth, authDispatcher }}>
        <NavBar />
        <Switch>
          {/* <Route path="/signup" component={SignUp} /> */}
          <PrivateRoute path="/protected" component={ComponentList} />
          <Route path="/signin" component={BodySignIn} />
        </Switch>
      </AuthContextProvider>
    </Router>
  );
};

export default App;
