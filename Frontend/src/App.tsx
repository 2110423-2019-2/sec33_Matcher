import React from 'react';
import { BodySignIn, Register, Home, CreateTask, Tasks, Console, UserListTable, Profile, PhotoType } from './pages';
import './App.css';
import { NavBar, ComponentList, PrivateRoute, Footer } from './components';
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
                    <Route path="/signin" component={BodySignIn} />
                    <Route path="/register" component={Register} />
                    <Route path="/task" component={Tasks} />
                    <Route path="/comp" component={ComponentList} />
                    <Route path="/type" component={PhotoType} />
                    <Route path='/profile/:id' component={Profile} roles={['admin', 'photographer', 'customer']} />
                    <Route path="/users" component={UserListTable} roles={['admin']} />
                    <Route path="/" component={Home} />
                </Switch>
                <Footer />
            </AuthContextProvider>
        </Router>
    );
};

export default App;