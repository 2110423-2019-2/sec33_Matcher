import React, { useContext, useEffect, useState } from 'react';
import { Section, TaskCard } from '../'
import './index.scss';
import { AuthContext } from '../../context/AuthContext';
import { getAvailableTasks, getMatchedTasks, getFinishedTasks } from '../../api/task';
import { dummyTasks } from '../../const';
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
                {/* {finishedTasks.map(task => <TaskCard name={task.username} location={task.location} profilePic={task.img} price={task.price} thumbnail={task.img} />)} */}
            </Section>
        </div>
    )
}