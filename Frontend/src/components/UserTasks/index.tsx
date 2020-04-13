import React, { useContext, useEffect, useState } from 'react';
import { Section, TaskCard } from '../';
import './index.scss';
import { AuthContext } from '../../context/AuthContext';
import { getAvailableTasks, getMatchedTasks, getFinishedTasks, rateTask } from '../../api/task';
import { dummyTasks } from '../../const';
import { whoami } from '../../api/user';
import { DialogContent, DialogContentText, DialogActions, Dialog, DialogTitle } from '@material-ui/core';
import { Input, Button } from '../../components';
import Rating from '@material-ui/lab/Rating';
import EditTask from '../EditTask';
import PhotoGrapherConsole from './PhotoGrapherConsole';
import CustomerConsole from './CustomerConsole';

interface ITask {
    title: string;
    _id: string;
    owner: string;
    location: string;
    img: string;
    price: number;
    ratingScore: number;
    comment: string;
}
export default () => {
    const { auth } = useContext(AuthContext);
    const [open, setOpen] = useState(true);
    const [editTask, setEditTask] = useState({ id: '', open: false });
    const [taskID, setTaskID] = useState('');
    const [rating, setRating] = useState<number | null>(0);
    const [comment, setComment] = useState('');
    const handleChange = (e: any) => {
        setComment(e.target.value);
    };

    const handleSubmit = (e: any) => {
        setOpen(false);
        rateTask(taskID, rating, comment);
    };

    const openDialog = (id: string) => (e: any) => {
        setOpen(true);
        setTaskID(id);
    };

    //photographer profile pic
    const awesome = '/images/awesome.png';
    const handleEditTask = (id: string) => {
        setEditTask({ id: id, open: true });
    }
    return (
        <div>
            {auth.role === 'customer' ? <CustomerConsole /> : <PhotoGrapherConsole />}
            {/* <EditTask taskId={editTask.id} isOpen={editTask.open} close={() => setEditTask({ id: '', open: false })} /> */}
            {/* <Dialog open={open} onClose={() => setOpen(false)} fullWidth={true} className="dialog">
                <DialogContent>
                    <DialogContentText>
                        <div className="ratingStar">
                            <p className="dialogContent">Review photographer's job</p>
                            <br></br>
                            <Rating
                                name="simple-controlled"
                                size="large"
                                value={rating}
                                onChange={(event: any, newValue: number | null) => {
                                    setRating(newValue);
                                }}
                            />
                        </div>

                        <div className="ratingProfilePic">
                            <img className="navBarProfilePic" src={awesome} alt="awesome" width="80" height="80"></img>
                        </div>
                    </DialogContentText>
                    <div className="comment">
                        <Input variant="filled" onChange={handleChange} label="Type your comment" fullWidth />
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button type="outlined" onClick={handleSubmit}>
                        Done
                    </Button>
                </DialogActions>
            </Dialog> */}
        </div >
    );
};
