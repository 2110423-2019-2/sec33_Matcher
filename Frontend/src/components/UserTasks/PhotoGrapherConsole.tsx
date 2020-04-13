import React, { useState, useEffect, Fragment } from 'react';
import { Section, TaskCard, Modal, Button, Input } from '..'
import { getPendingTasks, getMatchedTasks, getReqFinTasks, getFinishedTasks, finishTask, reportTask } from '../../api/task';
import { MenuItem, Dialog } from '@material-ui/core';


interface ITask {
    title: string;
    _id: string;
    owner: string;
    location: string;
    image: string;
    price: number;
    ratingScore: number;
    comment: string;
    acceptedBy: string;
}

export default () => {
    const [pendingTasks, setPendingTasks] = useState<Array<ITask>>([]);
    const [matchedTasks, setMatchedTasks] = useState<Array<ITask>>([]);
    const [reqFinTasks, setReqFinTasks] = useState<Array<ITask>>([]);
    const [finishedTasks, setFinishedTasks] = useState<Array<ITask>>([]);
    
    const [selectedTask, setSelectedTask] = useState<ITask>({
        title: '',
        _id: '',
        owner: '',
        location: '',
        image: '',
        price: 0,
        ratingScore: 0,
        comment: '',
        acceptedBy: ''
    })
    const [finish, setFinish] = useState(false);
    const [report, setReport] = useState(false);
    const [rpt, setRpt] = useState('');

    const fetchTasks = () => {
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
    const finishThisTask = (task: ITask) => {
        setFinish(true);
        setSelectedTask(task);
    }

    const handleReportTask = (id: string) => {
        reportTask(id, rpt).then(res => {
            console.log(res);
            fetchTasks();
            setReport(false);
        })
    }
    const reportChange = (e: any) => {
        setRpt(e.target.value);
    }
    const closeReport = () => setReport(false);
    const reportThisTask = (task: ITask) => {
        setReport(true);
        setSelectedTask(task);
    }

    useEffect(() => {
        fetchTasks();
    }, [])
    const closeFinish = () => {
        setFinish(false);
    }
    
    return (
        <div className="sectionContainer">
            <Section title="Pending task">
                {
                    pendingTasks.length === 0 ?
                        null :
                        pendingTasks.map(t =>
                            <TaskCard name={t.title}
                                thumbnail={t.image}
                                location={t.location}
                                profilePic={t.image}
                                price={t.price}
                                button='Pending'
                                disable
                            />)
                }
            </Section>
            <Section title="Matched task">
                {
                    matchedTasks.length === 0 ?
                        null :
                        matchedTasks.map(t => <TaskCard name={t.title}
                            thumbnail={t.image}
                            location={t.location}
                            profilePic={t.image}
                            price={t.price}
                            button='Done'
                            onClick={() => finishThisTask(t)}
                        />)
                }
            </Section>
            <Section title="Request for finished task">
                {
                    reqFinTasks.length === 0 ?
                        null :
                        reqFinTasks.map(t => <TaskCard name={t.title}
                            thumbnail={t.image}
                            location={t.location}
                            profilePic={t.image}
                            price={t.price}
                            button='Waiting'
                            disable
                        />)
                }
            </Section>
            <Section title="Past task">
                {
                    finishedTasks.length === 0 ?
                        null :
                        finishedTasks.map(t => <TaskCard name={t.title}
                            thumbnail={t.image}
                            location={t.location}
                            profilePic={t.image}
                            price={t.price}
                            button='No Review'
                            rating={t.ratingScore}
                            comment={t.comment}
                            review
                            disable
                            options={
                                <div>
                                    <MenuItem onClick={() => reportThisTask(t)}><p>Report</p></MenuItem>
                                </div>
                            }
                        />)
                }
            </Section>
            <Modal
                open={finish}
                close={closeFinish}
                title='Finish task'
                description={`Do you finish this task ?`}
                action={
                    <Fragment>
                        <Button fullWidth type="outlined" onClick={closeFinish}>Cancel</Button>
                        <Button fullWidth onClick={() => handleFinishTask(selectedTask._id)}>Accept</Button>
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
                        <Button fullWidth onClick={() => handleReportTask(selectedTask._id)}>Submit</Button>
                    </Fragment>
                }
            />
        </div>
    )
}