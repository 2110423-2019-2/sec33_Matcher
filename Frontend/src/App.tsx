import React from "react";
import { BodySignIn , Register, CreateTask} from "./pages";
import "./App.css";
import { NavBar, ComponentList } from "./components"
import "./index.scss";


const App: React.FC = () => {
    return (
        <div>
            <NavBar isLogin={false} username="John Doe" />
            <CreateTask />
        </div>
    );
};

export default App;
