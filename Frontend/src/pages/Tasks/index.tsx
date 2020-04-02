import React, { useEffect, useState } from 'react';
import './index.scss';
import { PHOTO_CATEGORIES, dummyTasks } from '../../const';
import { TaskCard } from '../../components';
import { getAvailableTasks, matchTask } from '../../api/task';
export default () => {
    const [tasks, setTasks] = useState<Array<any>>([]);
    const [taskFilter, setTaskFilter] = useState({
        filter: '',
    });
    useEffect(() => {
        getAvailableTasks()
            .then(tasks => {
                console.log(tasks);
                setTasks(tasks);
            })
            .catch(err => console.log(err));
    }, []);
    const filteredTasks = tasks.filter(task => task.photoStyle === taskFilter.filter || taskFilter.filter === '');

    const onclick = (category: string) => (e: any) => {
        if (taskFilter.filter === category) {
            setTaskFilter({
                filter: '',
            });
        } else {
            setTaskFilter({
                filter: category,
            });
        }
    };

    const onAccept = (id: string) => (e: any) => {
        matchTask(id);
    };

    return (
        <div className="taskPage">
            <div className="row taskTitle">
                <h4>Available Tasks</h4>
            </div>
            <div className="categories">
                <div className="items">
                    {PHOTO_CATEGORIES.map(category => {
                        return (
                            <p
                                onClick={onclick(category)}
                                className={`${category === taskFilter.filter ? 'activeFilter' : ''} pButton`}
                            >
                                {category}
                            </p>
                        );
                    })}
                </div>
                <div className="sortBy">
                    <p>sort by</p>
                </div>
            </div>
            <div className="row tasks">
                {filteredTasks.map(task => {
                    return (
                        <div className="col">
                            <TaskCard
                                onClick={onAccept(task._id)}
                                name={task.title}
                                location={task.location}
                                profilePic={task.img}
                                price={task.price}
                                thumbnail={task.img}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
