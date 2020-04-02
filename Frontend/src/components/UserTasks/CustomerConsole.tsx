import React, { useState, useEffect } from 'react';
import { Section, TaskCard } from '..'
import { getPendingTasks, getMatchedTasks, getReqFinTasks, getFinishedTasks, finishTask, getAvailableTasks, acceptTask } from '../../api/task';

interface ITask {
    title: string;
    _id: string;
    owner: string;
    location: string;
    image: string;
    price: number;
    ratingScore: number;
    comment: string;
}

export default () => {
    const [availableTasks, setAvailableTasks] = useState<Array<ITask>>([]);
    const [pendingTasks, setPendingTasks] = useState<Array<ITask>>([]);
    const [matchedTasks, setMatchedTasks] = useState<Array<ITask>>([]);
    const [reqFinTasks, setReqFinTasks] = useState<Array<ITask>>([]);
    const [finishedTasks, setFinishedTasks] = useState<Array<ITask>>([]);

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

    useEffect(() => {
        fetchTasks();
    }, [])


    return (
        <div className="sectionContainer">
            <Section title="Available task">
                {
                    availableTasks.length === 0 ?
                        null :
                        availableTasks.map(t => <TaskCard name={t.title}
                            location={t.location}
                            profilePic={t.image}
                            price={t.price}
                            button='Edit' />)
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
                        finishedTasks.map(t => <TaskCard name={t.title}
                            location={t.location}
                            profilePic={t.image}
                            price={t.price}
                            button='DONE' /
                        >)
                }
            </Section>
        </div>
    )
}