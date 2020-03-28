import React, { useContext, useEffect, useState } from 'react';
import { Section, TaskCard } from '../'
import './index.scss';
import { AuthContext } from '../../context/AuthContext';
import { getAvailableTasks, getMatchedTasks, getFinishedTasks } from '../../api/task';
import { dummyTasks } from '../../const';
import { DialogContent, DialogContentText, DialogActions, Dialog, DialogTitle } from '@material-ui/core';
import { Input, Button } from '../../components';

import Rating from '@material-ui/lab/Rating';
interface ITask {
    username: string,
    location: string,
    img: string,
    price: number
}
export default () => {
    const { auth } = useContext(AuthContext);
    const [availableTasks, setAvailableTasks] = useState<Array<ITask>>([]);
    const [matchedTasks, setMatchedTasks] = useState<Array<ITask>>([]);
    const [finishedTasks, setFinishedTasks] = useState<Array<ITask>>([]);
    const [open, setOpen] = useState(false);
    const fetchTasks = () => {
        getAvailableTasks().then(tasks => {
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
    
    // comment
    const [rateInfo, setRateInfo] = useState({
        comment: '',
      });
    const handleChange = (field: string) => (e: any) => {
        setRateInfo({
        ...rateInfo,
        [field]: e.target.value
        })
    }  

    // rating
    const [value, setValue] = React.useState<number | null>(2);

    //photographer profile pic
    const awesome = '/images/awesome.png';


      

    useEffect(() => {
        fetchTasks();
    }, [])
    return (
        <div className="sectionContainer">
            <Section title={`${auth.role === 'customer' ? 'Available' : 'Pending'} Task`}>
                {dummyTasks.length === 0 ? null : dummyTasks.map(task => <TaskCard name={task.username} location={task.location} profilePic={task.img} price={task.price} thumbnail={task.img} button={auth.role === 'customer' ? 'Edit' : 'Pending'} />)}
            </Section>
            <Section title="Matched Task">
                {/* {matchedTasks.map(task => <TaskCard name={task.username} location={task.location} profilePic={task.img} price={task.price} thumbnail={task.img} />)} */}
            </Section>
            <Section title="Past Task">
            {dummyTasks.length === 0 ? null : dummyTasks.map(task => <TaskCard onClick={() => setOpen(true)} name={task.username} location={task.location} profilePic={task.img} price={task.price} thumbnail={task.img} button={auth.role === 'customer' ? 'Review' : 'Pending' } />)}
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
                                    value={value}
                                    onChange={(event, newValue) => {
                                        setValue(newValue);
                                    }}
                                />
                            </div>
                            
                            <div className = "ratingProfilePic">
                                <img className="navBarProfilePic" src={awesome} alt="awesome" width="80" height="80"></img>
                            </div>
                        </DialogContentText>
                        <div className="comment">
                            <Input variant="filled" onChange={handleChange('comment')} label="Type your comment" fullWidth />
                        </div>
                    </DialogContent>
                    
                    <DialogActions>
                        <Button type="outlined" onClick={() => setOpen(false)}>Done</Button>
                    </DialogActions>
            </Dialog>
            
        </div>
    )
}