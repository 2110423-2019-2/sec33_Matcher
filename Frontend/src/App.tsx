import React, { useReducer } from "react";
import { BodySignIn , Register, Home, CreateTask, Tasks, EditProfile } from "./pages";
import "./App.css";
import { NavBar, ComponentList, PrivateRoute, PhotoType } from "./components";
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
      <AuthContextProvider>
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
          <Route path="/task" component={Tasks} />
          <Route path="/comp" component={ComponentList} />
          <Route path="/type" component={PhotoType} />
          <Route path="/edit" component={EditProfile} />
          <Route path="/" component={Home} />
        </Switch>
      </AuthContextProvider>
    </Router>
  );
};

export default App;
