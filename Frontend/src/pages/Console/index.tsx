import React, { useContext, useState, useEffect } from 'react';
import { UserTasks, Button } from '../../components';
import { AuthContext } from '../../context/AuthContext';
import './index.scss';
import { Link, withRouter } from 'react-router-dom';
import { CreateTask, EditProfile } from '..';
import { DialogContent, DialogContentText, DialogActions, Dialog, DialogTitle } from '@material-ui/core';
import { whoami, deleteUser, logout } from '../../api/user';

export default withRouter((props: any) => {
    const { auth, authDispatch } = useContext(AuthContext);
    const [currentPage, setCurrentPage] = useState<'profile' | 'task' | 'create'>('task');
    const [open, setOpen] = useState(false);
    const pages = { profile: <EditProfile />, task: <UserTasks />, create: <CreateTask /> };
    const deleteAccount = () => {
        console.log('deleted');
        whoami().then(profile => {
            deleteUser(profile._id).then(() => {
                logout().then(res => {
                    props.history.push('/')
                })
            })
        })

    };
    const signOut = () => {
        console.log('sign out');
        authDispatch({ type: 'SIGN_OUT' });
        logout().then(res =>
            props.history.push('/')
        )

    };
    useEffect(() => {
        if (!props.location.search) {
            setCurrentPage('task');
        } else {
            setCurrentPage(props.location.search.slice(5, props.location.search.length));
        }
        console.log(props.location)
    }, [props.location.search])
    return (
        <div className="consolePage">
            <div className="row consoleTitle">
                <div className="col-8">
                    <h4 className="consoleHeader">{`${auth.role === 'customer' ? 'User' : 'Photographer'} Console`}</h4>
                </div>
            </div>
            <div className="row consoleChoices">
                <div className="col-2">
                    <Link to='/console/?tab=profile'>
                        <p className={`${currentPage === 'profile' ? 'selected' : ''}`}>
                            Edit profile
                        </p>
                    </Link>
                </div>
                <div className="col-2">
                    <Link to='/console/?tab=task'>
                        <p className={`${currentPage === 'task' ? 'selected' : ''}`} >
                            Your tasks
                        </p>
                    </Link>
                </div>
                {auth.role === 'customer' ? (
                    <div className="col-2">
                        <Link to='/console/?tab=create'>
                            <p className={`${currentPage === 'create' ? 'selected' : ''}`}>
                                Create task
                        </p>
                        </Link>
                    </div>
                ) : null}
                <div className="col-2">
                    <p onClick={() => setOpen(true)} className="choice">
                        Delete Account
                    </p>
                </div>
                <div className="col-2">
                    <p onClick={signOut} className="choice">
                        Sign out
                    </p>
                </div>
                {/* <Dialog open={open} onClose={() => setOpen(false)} fullWidth={true} className="dialog">
                    <DialogTitle>
                        <h3 className="dialogTitle">Delete the account?</h3>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <p className="dialogContent">This account will be permanently deleted.</p>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={deleteAccount}>Delete account</Button>
                        <Button type="outlined" onClick={() => setOpen(false)}>
                            Back
                        </Button>
                    </DialogActions>
                </Dialog> */}
            </div>
            <div>{pages[currentPage]}</div>
        </div>
    );
});
