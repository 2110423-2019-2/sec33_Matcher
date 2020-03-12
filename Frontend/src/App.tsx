import React, { useReducer } from "react";
import { BodySignIn , Register, Home, CreateTask } from "./pages";
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
          <PrivateRoute
            path="/protected"
            component={ComponentList}
            roles={["admin"]}
          />
          <Route path="/signin" component={BodySignIn} />
          <Route path="/register" component={Register} />
          <Route path="/create" component={CreateTask} />
          <Route path="/" component={Home} />
        </Switch>
      </AuthContextProvider>
    </Router>
  );
};

export default App;
