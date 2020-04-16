import React, { useState, useEffect, useContext, Fragment } from 'react';
import { Section, TaskCard, Button, Input } from '..'
import { getPendingTasks, getMatchedTasks, getReqFinTasks, getFinishedTasks, finishTask, getAvailableTasks, acceptTask, deleteTask, rateTask, cancelTask, reportTask } from '../../api/task';
import Modal from '../Modal';
import { MenuItem, Dialog } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import EditTask from '../EditTask';
import Rating from '@material-ui/lab/Rating';

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
    const awesome = '/images/awesome.png';
    const [edit, setEdit] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [accept, setAccept] = useState(false);
    const [cancel, setCancel] = useState(false);
    const [finish, setFinish] = useState(false);
    const [review, setReview] = useState(false);
    const [rating, setRating] = useState<number | null>(0);
    const [report, setReport] = useState(false);
    const [cmt, setCmt] = useState('');
    const [rpt, setRpt] = useState('');
    const [selectedTask, setSelectedTask] = useState<ITask>(
        {
            title: '',
            _id: '',
            owner: '',
            location: '',
            image: '',
            price: 0,
            ratingScore: 0,
            comment: '',
            acceptedBy: ''
        });
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
        finishTask(id).then(res => {
            console.log(res)
            fetchTasks();
            setFinish(false);
        })
    }
    const handleAcceptTask = (id: string) => {
        acceptTask(id).then(res => {
            console.log(res)
            fetchTasks();
            setAccept(false);
        })
    }
    const handleDeleteTask = (id: string) => {
        deleteTask(id).then(res => {
            console.log(res);
            fetchTasks();
            setDeleted(false);
        })
    }
    const handleCancelTask = (id: string) => {
        cancelTask(id).then(res => {
            fetchTasks();
            setCancel(false);
        })
    }
    const handleReviewTask = (id: string) => {
        rateTask(id, rating, cmt).then(res => {
            console.log(res);
            fetchTasks();
            setReview(false);
        })
    }
    const handleReportTask = (acceptedBy: string) => {
        reportTask(acceptedBy, rpt).then(res => {
            console.log(res);
            fetchTasks();
            setReport(false);
        })
    }
    const viewPhotographer = (id: string) => {
        history.push(`/profile/${id}`);
    }
    const commentChange = (e: any) => {
        setCmt(e.target.value);
    }
    const reportChange = (e: any) => {
        setRpt(e.target.value);
    }
    const closeDeleted = () => setDeleted(false);
    const closeEdit = () => setEdit(false);
    const closeAccept = () => setAccept(false);
    const closeCancel = () => setCancel(false);
    const closeFinish = () => setFinish(false);
    const closeReview = () => setReview(false);
    const closeReport = () => setReport(false);
    const editThisTask = (task: ITask) => {
        setEdit(true);
        setSelectedTask(task);
    }
    const deleteThisTask = (task: ITask) => {
        setDeleted(true);
        setSelectedTask(task);
    }
    const acceptThisTask = (task: ITask) => {
        setAccept(true);
        setSelectedTask(task);
    }
    const cancelThisTask = (task: ITask) => {
        setCancel(true);
        setSelectedTask(task);
    }
    const finishThisTask = (task: ITask) => {
        setFinish(true);
        setSelectedTask(task);
    }
    const reviewThisTask = (task: ITask) => {
        setReview(true);
        setSelectedTask(task);
    }
    const reportThisTask = (task: ITask) => {
        setReport(true);
        setSelectedTask(task);
    }
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
                                <TaskCard
                                    thumbnail={t.image}
                                    name={t.title}
                                    location={t.location}
                                    profilePic={t.image}
                                    price={t.price}
                                    button='Edit'
                                    onClick={() => editThisTask(t)}
                                    options={
                                        <div>
                                            <MenuItem onClick={() => deleteThisTask(t)}><p>Delete task</p></MenuItem>
                                            <MenuItem onClick={() => editThisTask(t)}><p>Edit task</p></MenuItem>
                                        </div>
                                    }
                                />
                            )
                        })
                }
            </Section>
            <Section title="Pending task">
                {
                    pendingTasks.length === 0 ?
                        null :
                        pendingTasks.map(t =>
                            <TaskCard
                                thumbnail={t.image}
                                name={t.title}
                                key={t._id}
                                location={t.location}
                                profilePic={t.image}
                                price={t.price}
                                button='Accept'
                                onClick={() => acceptThisTask(t)}
                                options={
                                    <div>
                                        <MenuItem onClick={() => viewPhotographer(t.acceptedBy ? t.acceptedBy : '')}><p>Photographer profile</p></MenuItem>
                                        <MenuItem onClick={() => acceptThisTask(t)}><p>Accept task</p></MenuItem>
                                        <MenuItem onClick={() => cancelThisTask(t)}><p>Decline matching</p></MenuItem>
                                    </div>
                                }
                            />
                        )
                }
            </Section>
            <Section title="Matched task">
                {
                    matchedTasks.length === 0 ?
                        null :
                        matchedTasks.map(t =>
                            <TaskCard
                                thumbnail={t.image}
                                name={t.title}
                                key={t._id}
                                location={t.location}
                                profilePic={t.image}
                                price={t.price}
                                button='Matched'
                                disable
                            />
                        )
                }
            </Section>
            <Section title="Request for finished task">
                {
                    reqFinTasks.length === 0 ?
                        null :
                        reqFinTasks.map(t =>
                            <TaskCard
                                thumbnail={t.image}
                                name={t.title}
                                key={t._id}
                                location={t.location}
                                profilePic={t.image}
                                price={t.price}
                                button='Confirm'
                                onClick={() => finishThisTask(t)}
                            />
                        )
                }
            </Section>
            <Section title="Past task">
                {
                    finishedTasks.length === 0 ?
                        null :
                        finishedTasks.map(t => {
                            return (
                                <TaskCard
                                    thumbnail={t.image}
                                    name={t.title}
                                    key={t._id}
                                    location={t.location}
                                    profilePic={t.image}
                                    price={t.price}
                                    button='Review'
                                    rating={t.ratingScore}
                                    comment={t.comment}
                                    review
                                    onClick={t.ratingScore ? () => { } : () => reviewThisTask(t)}
                                    options={
                                        <div>
                                            <MenuItem onClick={() => reviewThisTask(t)}><p>Review</p></MenuItem>
                                            <MenuItem onClick={() => reportThisTask(t)}><p>Report</p></MenuItem>
                                        </div>
                                    }
                                />
                            )
                        })
                }
            </Section>
            <Modal
                open={deleted}
                close={closeDeleted}
                title="Delete task"
                description={`This task will be permanently deleted.`}
                action={
                    <Fragment>
                        <Button fullWidth type="outlined" onClick={closeDeleted}>Cancel</Button>
                        <Button fullWidth onClick={() => handleDeleteTask(selectedTask._id)}>Delete</Button>
                    </Fragment>
                }
            />
            <Modal
                open={edit}
                close={closeEdit}
                title="Edit task"
                description={
                    <EditTask init={selectedTask} />
                }
            />
            <Modal
                open={accept}
                close={closeAccept}
                title="Accept task"
                description={`Do you want to accept this request ?`}
                action={
                    <Fragment>
                        <Button fullWidth type="outlined" onClick={closeAccept}>Cancel</Button>
                        <Button fullWidth onClick={() => handleAcceptTask(selectedTask._id)}>Accept</Button>
                    </Fragment>
                }
            />
            <Modal
                open={cancel}
                close={closeCancel}
                title='Cancel task'
                description={`Do you want to cancel this request.`}
                action={
                    <Fragment>
                        <Button fullWidth type="outlined" onClick={closeCancel}>Cancel</Button>
                        <Button fullWidth onClick={() => handleCancelTask(selectedTask._id)}>Accept</Button>
                    </Fragment>
                }
            />
            <Modal
                open={finish}
                close={closeFinish}
                title='Finish task'
                description={`Is this task already finished ?`}
                action={
                    <Fragment>
                        <Button fullWidth type="outlined" onClick={closeFinish}>Cancel</Button>
                        <Button fullWidth onClick={() => handleFinishTask(selectedTask._id)}>Confirm</Button>
                    </Fragment>
                }
            />
            <Modal
                open={review}
                close={closeReview}
                description={
                    <Fragment>
                        <div className="ratingStar">
                            <h6 className="dialogContent">Review photographer's job</h6>
                            <br></br>
                            <Rating
                                size="large"
                                value={rating}
                                onChange={(event, newValue) => {
                                    setRating(newValue);
                                }}
                            />
                        </div>
                        <div className="ratingProfilePic">
                            <img className="navBarProfilePic" src={awesome} alt="awesome" width="80" height="80"></img>
                        </div>
                        <div className="comment">
                            <Input variant="filled" onChange={commentChange} label="Type your comment" fullWidth />
                        </div>
                    </Fragment>
                }
                action={
                    <Fragment>
                        <Button fullWidth type="outlined" onClick={closeReview}>Cancel</Button>
                        <Button fullWidth onClick={() => handleReviewTask(selectedTask._id)}>Submit</Button>
                    </Fragment>
                }
            />
             <Modal
                open={report}
                close={closeReport}
                description={
                    <Fragment>
                        <h6 className="dialogContent">Report</h6>
                        <br></br>
                        <div className="comment">
                            <Input variant="filled" onChange={reportChange} label="Type your report" fullWidth />
                        </div>
                    </Fragment>
                }
                action={
                    <Fragment>
                        <Button fullWidth type="outlined" onClick={closeReport}>Cancel</Button>
                        <Button fullWidth onClick={() => handleReportTask(selectedTask.acceptedBy ? selectedTask.acceptedBy : '')}>Submit</Button>
                    </Fragment>
                }
            />

        </div>
    )
}