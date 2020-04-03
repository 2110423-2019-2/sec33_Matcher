import React, { useState, useEffect, useContext, Fragment } from 'react';
import { Section, TaskCard, Button } from '..'
import { getPendingTasks, getMatchedTasks, getReqFinTasks, getFinishedTasks, finishTask, getAvailableTasks, acceptTask, deleteTask } from '../../api/task';
import Modal from '../Modal';
import { MenuItem, Dialog } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import EditTask from '../EditTask';

interface ITask {
    title: string;
    _id: string;
    owner: string;
    location: string;
    image: string;
    price: number;
    ratingScore: number;
    comment: string;
    acceptedBy?: string;
}

export default () => {
    const [availableTasks, setAvailableTasks] = useState<Array<ITask>>([]);
    const [pendingTasks, setPendingTasks] = useState<Array<ITask>>([]);
    const [matchedTasks, setMatchedTasks] = useState<Array<ITask>>([]);
    const [reqFinTasks, setReqFinTasks] = useState<Array<ITask>>([]);
    const [finishedTasks, setFinishedTasks] = useState<Array<ITask>>([]);
    const history = useHistory();
    const [edit, setEdit] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const fetchTasks = () => {
        getAvailableTasks().then(t => {
            setAvailableTasks(t);
        })
        getPendingTasks().then(t => {
            setPendingTasks(t);
        })
        getMatchedTasks().then(t => {
            setMatchedTasks(t);
        })
        getReqFinTasks().then(t => {
            setReqFinTasks(t);
        })
        getFinishedTasks().then(t => {
            setFinishedTasks(t);
        })
    }

    const handleFinishTask = (id: string) => {
        finishTask(id).then(res =>
            console.log(res)
        )
    }
    const handleAcceptTask = (id: string) => {
        acceptTask(id).then(res => {
            console.log(res)
        })
    }
    const handleDeleteTask = (id: string) => {
        deleteTask(id).then(res => {
            console.log(res);
        })
    }

    const viewPhotographer = (id: string) => {
        history.push(`/profile/${id}`);
    }
    const closeDeleted = () => setDeleted(false);
    const closeEdit = () => setEdit(false);
    useEffect(() => {
        fetchTasks();
    }, [])


    return (
        <div className="sectionContainer">
            <Section title="Available task">
                {
                    availableTasks.length === 0 ?
                        null :
                        availableTasks.map(t => {
                            return (
                                <div>
                                    <TaskCard name={t.title}
                                        location={t.location}
                                        profilePic={t.image}
                                        price={t.price}
                                        button='Edit'
                                        options={
                                            <div>
                                                <MenuItem onClick={() => setDeleted(true)}><p>Delete task</p></MenuItem>
                                                <MenuItem onClick={() => setEdit(true)}><p>Edit task</p></MenuItem>
                                            </div>
                                        }
                                    />
                                    <Modal
                                        open={deleted}
                                        close={closeDeleted}
                                        key={`delete${t._id}`}
                                        title="Delete task"
                                        description={`This task will be permanently deleted.`}
                                        action={
                                            <Fragment>
                                                <Button fullWidth type="outlined" onClick={closeDeleted}>Cancel</Button>
                                                <Button fullWidth onClick={() => handleDeleteTask(t._id)}>Delete</Button>
                                            </Fragment>
                                        }
                                    />
                                    <Modal
                                        open={edit}
                                        close={closeEdit}
                                        key={`edit${t._id}`}
                                        title="Edit task"
                                        description={
                                            <EditTask taskId={t._id} />
                                        }
                                    />
                                </div>
                            )
                        })
                }
            </Section>
            <Section title="Pending task">
                {
                    pendingTasks.length === 0 ?
                        null :
                        pendingTasks.map(t => <TaskCard name={t.title}
                            location={t.location}
                            profilePic={t.image}
                            price={t.price}
                            button='ACCEPT'
                            onClick={() => handleAcceptTask(t._id)}
                            options={
                                <div>
                                    <MenuItem onClick={() => viewPhotographer(t.acceptedBy ? t.acceptedBy : '')}><p>Photographer profile</p></MenuItem>
                                    <MenuItem><p>Accept task</p></MenuItem>
                                    <MenuItem><p>Decline matching</p></MenuItem>
                                </div>
                            }
                        />)
                }
            </Section>
            <Section title="Matched task">
                {
                    matchedTasks.length === 0 ?
                        null :
                        matchedTasks.map(t => <TaskCard name={t.title}
                            location={t.location}
                            profilePic={t.image}
                            price={t.price}
                            button='MATCHED'
                        />)
                }
            </Section>
            <Section title="Request for finished task">
                {
                    reqFinTasks.length === 0 ?
                        null :
                        reqFinTasks.map(t => <TaskCard name={t.title}
                            location={t.location}
                            profilePic={t.image}
                            price={t.price}
                            button='FINISH'
                            onClick={() => handleFinishTask(t._id)}
                        />)
                }
            </Section>
            <Section title="Past task">
                {
                    finishedTasks.length === 0 ?
                        null :
                        finishedTasks.map(t => {
                            return (
                                <TaskCard name={t.title}
                                    location={t.location}
                                    profilePic={t.image}
                                    price={t.price}
                                    button='DONE'
                                    rating={t.ratingScore}
                                    comment={t.comment}
                                    review
                                />
                            )
                        })
                }
            </Section>
        </div>
    )
}