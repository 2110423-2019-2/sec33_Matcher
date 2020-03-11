import React, { useContext, useState } from "react";
import "./index.scss";
import { Input, Button } from "../../components";
import { ReactComponent as Chevron } from "../../assets/icons/chevron-right.svg";
import { Link, useHistory } from 'react-router-dom';
import { createTask } from '../../api/task';

import { Select } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';

export default () => {
  const [taskInfo, setTaskInfo] = useState({
    taskname: '',
    location: '',
    image: '',
    tasktype: '',
    price: '',
});
  const history = useHistory();

  const handleChange = (field: string) => (e: any) => {
    setTaskInfo({
      ...taskInfo,
      [field]: e.target.value
    })
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    createTask(taskInfo)
    .then(() => history.push('/createtask'))
};  
  
  return (
    <div className="createTaskPage">
    <div className="row createTaskTitle">
      <div className="col-3">
          <h4 className="createTaskHeader">Create Task</h4>
      </div>
    </div>
    <div className="row messageTask">
      <div className="col-8">
        <p>You can create your task here. Click 'Launch task' after that.</p>
      </div>
    </div>
    <form onSubmit={handleSubmit}>
    <div className="row createTaskTitle">
      <div className="col-6">
        <Input variant="filled" onChange={handleChange('taskname')} label="Task name" fullWidth />
      </div>
      <div className="col-6">
        <Input variant="filled" onChange={handleChange('location')} label="Location" fullWidth />
      </div>
    </div>
    <div className="row createTaskTitle">
      <div className="col-6">
        <Input variant="filled" onChange={handleChange('image')} label="Cover image" fullWidth />
      </div>
      <div className="col-6">
      <FormControl variant="filled" fullWidth>
        <InputLabel>Task type</InputLabel>
        <Select onChange={handleChange('tasktype')}>
          <MenuItem value={'type1'}>Type 1</MenuItem>
          <MenuItem value={'type2'}>Type 2</MenuItem>
          <MenuItem value={'type3'}>Type 3</MenuItem>
        </Select>
      </FormControl>
      </div>
    </div>
    <div className="row createTaskTitle">
      <div className="col-6">
        <Input variant="filled" onChange={handleChange('price')} label="Price rate per hour" fullWidth />
      </div>
      <div className="col-6 createTaskTitle">
        <Button type="invert" fullWidth>Launch Task<Chevron style={{ strokeWidth: 1 }} />
        </Button>
      </div>
    </div>
    </form>
  </div>
  );
};  