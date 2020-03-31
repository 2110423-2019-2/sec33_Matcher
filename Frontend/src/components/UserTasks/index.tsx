import React, { useContext, useEffect, useState } from 'react';
import { Section, TaskCard } from '../'
import './index.scss';
import { AuthContext } from '../../context/AuthContext';
import { getAvailableTasks, getMatchedTasks, getFinishedTasks, rateTask } from '../../api/task';
import { dummyTasks } from '../../const';
import { whoami } from '../../api/user';
import { DialogContent, DialogContentText, DialogActions, Dialog, DialogTitle } from '@material-ui/core';
import { Input, Button } from '../../components';
import Rating from '@material-ui/lab/Rating';

interface ITask {
    title: string,
    _id: string,
    owner: string,
    location: string,
    image: string,
    price: number,
    ratingScore: number,
    comment: string
}
export default () => {
    const { auth } = useContext(AuthContext);
    const [availableTasks, setAvailableTasks] = useState<Array<ITask>>([]);
    const [matchedTasks, setMatchedTasks] = useState<Array<ITask>>([]);
    const [finishedTasks, setFinishedTasks] = useState<Array<ITask>>([]);
    const [open, setOpen] = useState(false);
    const fetchTasks = () => {
        getAvailableTasks().then(tasks => {
            console.log(availableTasks)
            setAvailableTasks(tasks);
        }).catch(err =>
            console.log(err)
        );
        getMatchedTasks().then(tasks => {
            setMatchedTasks(tasks);
        }).catch(err =>
            console.log(err)
        );
        getFinishedTasks().then(tasks => {
            setFinishedTasks(tasks);
        }).catch(err =>
            console.log(err)
        );
    }
    
    const [taskID, setTaskID] = useState('');
    const [rating, setRating] = useState<number | null>(0);
    const [comment, setComment] = useState('');
    const handleChange = (e: any) => {
        setComment(e.target.value);
    }  

    const handleSubmit = (e:any) => {
        setOpen(false);
        rateTask(taskID, rating, comment)
    }

    const openDialog = (id:string, rating: number, comment: string) => (e:any) => {
        setOpen(true);
        setTaskID(id);
        setRating(rating);
        setComment(comment);
    }

    //photographer profile pic
    const awesome = '/images/awesome.png';


      

    useEffect(() => {
        fetchTasks();
        // whoami().then(res => console.log(res))
    }, [])
    return (
        <div className="sectionContainer">
            <Section title={`${auth.role === 'customer' ? 'Available' : 'Pending'} Task`}>
                {availableTasks.length === 0 ? null : availableTasks.map(task => <TaskCard name={task.title} location={task.location} profilePic={task.img} price={task.price} thumbnail={task.img} button={auth.role === 'customer' ? 'Edit' : 'Pending'} />)}
            </Section>
            <Section title="Matched Task">
                {matchedTasks.length === 0 ? null : matchedTasks.map(task => <TaskCard name={task.title} location={task.location} profilePic={task.img} price={task.price} thumbnail={task.img} button={auth.role === 'customer' ? 'Edit' : 'Pending'} />)}
            </Section>
            <Section title="Past Task">
                {finishedTasks.length === 0 ? null : finishedTasks.map(task => <TaskCard name={task.title} location={task.location} profilePic={task.img} price={task.price} thumbnail={task.img} button={auth.role === 'customer' ? 'Edit' : 'Pending'} />)}
            </Section>

            {/* dialog */}
            <Dialog open={open} onClose={() => setOpen(false)} fullWidth={true} className="dialog">
                    <DialogContent>
                        <DialogContentText>
                            <div className = "ratingStar">
                                <p className="dialogContent">Review photographer's job</p>
                                <br></br>
                                <Rating
                                    name="simple-controlled"
                                    size="large"
                                    value={rating}
                                    onChange={(event:any, newValue:number | null) => {
                                        setRating(newValue);
                                    }}
                                />
                            </div>
                            
                            <div className = "ratingProfilePic">
                                <img className="navBarProfilePic" src={awesome} alt="awesome" width="80" height="80"></img>
                            </div>
                        </DialogContentText>
                        <div className="comment">
                            <Input variant="filled" onChange={handleChange} label="Type your comment" fullWidth />
                        </div>
                    </DialogContent>
                    
                    <DialogActions>
                        <Button type="outlined" onClick={handleSubmit}>Done</Button>
                    </DialogActions>
            </Dialog>
            
        </div>
    )
}