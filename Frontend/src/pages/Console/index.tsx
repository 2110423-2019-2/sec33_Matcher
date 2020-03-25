import React, { useContext, useState, useEffect } from 'react';
import { UserTasks, Button } from '../../components';
import { AuthContext } from '../../context/AuthContext';
import './index.scss';
import { Link, withRouter } from 'react-router-dom';
import { CreateTask, EditProfile } from '..';
import { DialogContent, DialogContentText, DialogActions, Dialog, DialogTitle } from '@material-ui/core';

export default withRouter((props: any) => {
    const { auth, authDispatch } = useContext(AuthContext);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [open, setOpen] = useState(false);
    const pages = [<EditProfile />, <UserTasks />, <CreateTask />]
    const deleteAccount = () => {
        console.log('deleted');
        // TODO call delete account api
        props.history.push('/home');
    }
    const signOut = () => {
        console.log('sign out');
        // TODO call sign out api here
        authDispatch({ type: 'SIGN_OUT' })
        props.history.push('/home');
    }
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
                        <p className={`${currentPage === 0 ? 'selected' : ''}`} onClick={() => setCurrentPage(0)}>Edit profile</p>
                    </Link>
                </div>
                <div className="col-2">
                    <Link to='/console/tasks'>
                        <p className={`${currentPage === 1 ? 'selected' : ''}`} onClick={() => setCurrentPage(1)}>Your tasks</p>
                    </Link>
                </div>
                {auth.role === 'customer' ?
                    <div className="col-2">
                        <Link to='/console/createtask'>
                            <p className={`${currentPage === 2 ? 'selected' : ''}`} onClick={() => setCurrentPage(2)}>Create task</p>
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
            <div>{pages[currentPage]}</div>
        </div>
    )
})