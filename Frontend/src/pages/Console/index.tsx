import React, { useContext, useState, useEffect } from 'react';
import { PrivateRoute, UserTasks, Button } from '../../components';
import { AuthContext } from '../../context/AuthContext';
import './index.scss';
import { CONSOLE_CHOICES, dummyTasks } from '../../const';
import { Link, Switch, withRouter } from 'react-router-dom';
import { CreateTask } from '..';
import { DialogContent, DialogContentText, DialogActions, Dialog, DialogTitle } from '@material-ui/core';

export default withRouter((props: any) => {
    const { auth, authDispatch } = useContext(AuthContext);
    const [current, setCurrent] = useState('');
    const [isChange, setIsChange] = useState(false)
    const [open, setOpen] = useState(false);
    const deleteAccount = () => {
        console.log('deleted');
        // TODO call delete account api and signout
        props.history.push('/home');
    }
    const signOut = () => {
        console.log('sign out');
        // TODO call sign out api here
        authDispatch({ type: 'SIGNOUT' })
        props.history.push('/home');
    }
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
                    <p onClick={() => setOpen(true)} className="choice">Delete Account</p>
                </div>
                <div className="col-2">
                    <p onClick={signOut} className="choice">Sign out</p>
                </div>
                <Dialog open={open} onClose={() => setOpen(false)} fullWidth={true} className="dialog">
                    <DialogTitle>
                        <h3 className="dialogTitle">
                            Delete the account?
                        </h3>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <p className="dialogContent">This account will be permanently deleted.</p>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={deleteAccount}>Delete account</Button>
                        <Button type="outlined" onClick={() => setOpen(false)}>Back</Button>
                    </DialogActions>
                </Dialog>
            </div>
            <Switch>
                {/* <PrivateRoute path="/console/editprofile" components={EditProfile}/ role={["customer", "photographer"]}> */}
                <PrivateRoute path='/console/tasks' component={UserTasks} roles={["customer", "photographer"]} />
                <PrivateRoute path='/console/createtask' component={CreateTask} roles={["customer"]} />
            </Switch>
        </div>
    )
})