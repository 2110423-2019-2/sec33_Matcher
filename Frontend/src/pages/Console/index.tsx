import React, { useContext, useState, useEffect } from 'react';
import { PrivateRoute, UserTasks } from '../../components';
import { AuthContext } from '../../context/AuthContext';
import './index.scss';
import { CONSOLE_CHOICES, dummyTasks } from '../../const';
import { Link, Switch, useLocation, withRouter } from 'react-router-dom';
import { CreateTask } from '..';

export default withRouter((props: any) => {
    const { auth } = useContext(AuthContext);
    const [current, setCurrent] = useState('');
    const [isChange, setIsChange] = useState(false)
    useEffect(() => {
        setCurrent(props.location.pathname);
    }, [isChange])
    return (
        <div className="consolePage">
            <div className="row consoleTitle">
                <div className="col-8">
                    <h4 className="consoleHeader">{`${auth.role === 'customer' ? "User" : "Photographer"} Console`}</h4>
                </div>
            </div>
            <div className="row consoleChoices">
                <div className="col-2">
                    <Link to='/console/editprofile'>
                        <p className={`${current.toString() === '/console/editprofile' ? 'selected' : ''}`} onClick={() => setIsChange(!isChange)}>Edit profile</p>
                    </Link>
                </div>
                <div className="col-2">
                    <Link to='/console/tasks'>
                        <p className={`${current.toString() === '/console/tasks' ? 'selected' : ''}`} onClick={() => setIsChange(!isChange)}>Your tasks</p>
                    </Link>
                </div>
                {auth.role === 'customer' ?
                    <div className="col-2">
                        <Link to='/console/createtask'>
                            <p className={`${current.toString() === '/console/createtask' ? 'selected' : ''}`} onClick={() => setIsChange(!isChange)}>Create task</p>
                        </Link>
                    </div> : null}
                <div className="col-2">
                    <p>Delete Account</p>
                </div>
                <div className="col-2">
                    <p>Sign out</p>
                </div>
            </div>
            <Switch>
                {/* <PrivateRoute path="/console/editprofile" components={EditProfile}/ role={["customer", "photographer"]}> */}
                <PrivateRoute path='/console/tasks' component={UserTasks} roles={["customer", "photographer"]} />
                <PrivateRoute path='/console/createtask' component={CreateTask} roles={["customer"]} />
            </Switch>
        </div>
    )
})