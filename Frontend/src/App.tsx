import React from 'react';
import { BodySignIn, Register, Home, CreateTask, Tasks, Console, UserListTable } from './pages';
import './App.css';
import { NavBar, ComponentList, PrivateRoute, PhotoType, Footer } from './components';
import './index.scss';
import { authReducer, defaultAuth, AuthContextProvider } from './context/AuthContext';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App: React.FC = () => {
    return (
        <Router>
            <AuthContextProvider>
                <NavBar />

                <Switch>
                    <PrivateRoute path="/protected" component={ComponentList} roles={['admin']} />
                    <Route path="/console" component={Console} roles={['photographer', 'customer']} />
                    <Route path="/create" component={CreateTask} />
                    <Route path="/signin" component={BodySignIn} />
                    <Route path="/register" component={Register} />
                    <Route path="/task" component={Tasks} />
                    <Route path="/comp" component={ComponentList} />
                    <Route path="/type" component={PhotoType} />
                    <Route path="/users" component={UserListTable} />
                    <Route path="/" component={Home} />
                </Switch>
                <Footer />
            </AuthContextProvider>
        </Router>
    );
};

export default App;