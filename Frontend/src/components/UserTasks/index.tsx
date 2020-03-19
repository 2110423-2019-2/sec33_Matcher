import React, { useContext } from 'react';
import { Section } from '../'
import './index.scss';
import { AuthContext } from '../../context/AuthContext';
export default () => {
    const { auth } = useContext(AuthContext);
    return (
        <div className="sectionContainer">
            <Section title={`${auth.role === 'customer' ? 'Available' : 'Pending'} Task`}>
                {/* {pendingTasks.map(task => <TaskCard name={task.username} location={task.location} profilePic={task.img} price={task.price} thumbnail={task.img} />)} */}
            </Section>
            <Section title="Matched Task">
                {/* <TaskCard></TaskCard> */}
            </Section>
            <Section title="Past Task">
                {/* <TaskCard></TaskCard> */}
            </Section>
        </div>
    )
}