import React from 'react';
import { BodySignIn } from './pages';
import './App.css';
import { NavBar, ComponentList } from './components';
import './index.scss';

const App: React.FC = () => {
    return (
        <div>
            <NavBar isLogin={false} username="John Doe" />
            <BodySignIn />
        </div>
    );
};

export default App;
