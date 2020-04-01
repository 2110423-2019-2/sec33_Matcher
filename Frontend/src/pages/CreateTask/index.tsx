import React, { useState } from 'react';
import './index.scss';
import { Input, Button } from '../../components';
import { ReactComponent as Chevron } from '../../assets/icons/chevron-right.svg';
import { useHistory } from 'react-router-dom';
import { upsertTask } from '../../api/task';
import { Select } from '@material-ui/core';
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
    const [errorText, setErrorText] = useState({
        taskname: '',
        location: '',
        image: '',
        price: '',
    });

    const validate = () => {
        setErrorText({
            ...errorText,
            taskname: taskInfo.taskname.length === 0 ? 'Taskname cannot be empty.' : '',
            location: taskInfo.location.length === 0 ? 'Location cannot be empty.' : '',
            image: taskInfo.image.length === 0 ? 'Image cannot be empty.' : '',
            price: taskInfo.price.length === 0 ? 'Price cannot be empty.' : '',
        });
        if (taskInfo.taskname.length === 0) return false;
        if (taskInfo.location.length === 0) return false;
        if (taskInfo.image.length === 0) return false;
        if (taskInfo.price.length === 0) return false;
        return true;
    };

    const history = useHistory();

    const handleChange = (field: string) => (e: any) => {
        setTaskInfo({
            ...taskInfo,
            [field]: e.target.value,
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (validate()) {
            console.log(taskInfo);
            const task = {
                title: taskInfo.taskname,
                location: taskInfo.location,
                image: taskInfo.image,
                price: parseFloat(taskInfo.price),
                photoStyle: taskInfo.tasktype,
            };
            console.log(task);
            upsertTask('', task).then(res => {
                console.log(res);
            });
            // history.push('/');
        }
    };

    return (
        <div className="createTaskPage">
            <form>
                <div className="row createTaskTitle">
                    <div className="col-6">
                        <Input
                            variant="filled"
                            error={Boolean(errorText.taskname)}
                            helperText={errorText.taskname}
                            onChange={handleChange('taskname')}
                            label="Task name"
                            fullWidth
                            value="test"
                        />
                    </div>
                    <div className="col-6">
                        <Input
                            variant="filled"
                            error={Boolean(errorText.location)}
                            helperText={errorText.location}
                            onChange={handleChange('location')}
                            label="Location"
                            fullWidth
                        />
                    </div>
                </div>
                <div className="row createTaskTitle">
                    <div className="col-6">
                        <Input
                            variant="filled"
                            error={Boolean(errorText.image)}
                            helperText={errorText.image}
                            onChange={handleChange('image')}
                            label="Cover image"
                            fullWidth
                        />
                    </div>
                    <div className="col-6">
                        <FormControl variant="filled" fullWidth>
                            <InputLabel>Task type</InputLabel>
                            <Select onClick={handleChange('tasktype')} defaultValue="Product">
                                <MenuItem value={'PRODUCT'}>Product</MenuItem>
                                <MenuItem value={'PLACE'}>Place</MenuItem>
                                <MenuItem value={'RESTAURANT'}>Cafe & Restaurant</MenuItem>
                                <MenuItem value={'GRADUATION'}>Graduation</MenuItem>
                                <MenuItem value={'WEDDING'}>Wedding</MenuItem>
                                <MenuItem value={'EVENT'}>Event</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div className="row createTaskTitle">
                    <div className="col-6">
                        <Input
                            variant="filled"
                            error={Boolean(errorText.price)}
                            helperText={errorText.price}
                            onChange={handleChange('price')}
                            label="Price rate per hour"
                            fullWidth
                        />
                    </div>
                    <div className="col-6 createTaskTitle">
                        <Button type="invert" onClick={handleSubmit} fullWidth>
                            Launch Task
                            <Chevron style={{ strokeWidth: 1 }} />
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
};
