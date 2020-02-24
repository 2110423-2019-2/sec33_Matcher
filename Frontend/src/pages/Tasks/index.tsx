import React from "react";
import "./index.scss";
import { PHOTO_CATEGORIES, dummyTasks } from "../../const";
import { TaskCard } from "../../components";
export default () => {
  return (
    <div className="taskPage">
      <div className="row taskTitle">
        <h4>Available Tasks</h4>
      </div>
      <div className="row categories">
        {PHOTO_CATEGORIES.map(category => {
          return (
            <div className="col">
              <p>{category}</p>
            </div>
          );
        })}
        <div className="col sortBy">
          <p>sort by</p>
        </div>
      </div>
      <div className="row tasks">
        {dummyTasks.map(task => {
          return (
            <div className="col">
              <TaskCard
                name={task.username}
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
