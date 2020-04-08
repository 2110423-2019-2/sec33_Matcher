import React, { useState, useEffect, Fragment } from 'react';
import { Section, TaskCard, Modal, Button } from '..'
import { getPendingTasks, getMatchedTasks, getReqFinTasks, getFinishedTasks, finishTask } from '../../api/task';


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
        </div>
    )
}