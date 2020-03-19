import React, { useContext, useState, useEffect } from 'react';
import { NavBar, Footer, Section, TaskCard } from '../../components';
import { AuthContext } from '../../context/AuthContext';
import './index.scss';
import { CONSOLE_CHOICES, dummyTasks } from '../../const';
export default () => {
    const { auth } = useContext(AuthContext);
    const [currentPage, setCurrentPage] = useState("Your tasks");
    const [pendingTasks, setPendingTasks] = useState(dummyTasks);
    const [matchedTasks, setMatchedTasks] = useState(dummyTasks);
    const [pastTasks, setPastTasks] = useState(dummyTasks);
    useEffect(() => {
        // TODO getPendingTasks Here
        // TODO getMatchedTasks Here
        // TODO getPastTasks Here
    }, [])
    return (
        <div className="consolePage">
            <div className="row consoleTitle">
                <div className="col-8">
                    <h4 className="consoleHeader">{`${auth.role === 'customer' ? "User" : "Photographer"} Console`}</h4>
                </div>
            </div>
            <div className="row consoleChoices">
                {CONSOLE_CHOICES.map(choice => {
                    return (
                        <div className="col-2">
                            <p className={`${currentPage === choice ? "selected" : ""}`}>{choice}</p>
                        </div>
                    )
                })}
            </div>
            <div className="sectionContainer">
                <Section title="Pending Task">
                    {pendingTasks.map(task => <TaskCard name={task.username} location={task.location} profilePic={task.img} price={task.price} thumbnail={task.img} />)}
                </Section>
                <Section title="Matched Task">
                    {/* <TaskCard></TaskCard> */}
                </Section>
                <Section title="Past Task">
                    {/* <TaskCard></TaskCard> */}
                </Section>
            </div>
        </div>
    )
}