import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    DialogContentText,
    FormControl,
    MenuItem,
    InputLabel,
    Select,
} from '@material-ui/core';
import { Button, Input } from '..';
import { ReactComponent as Chevron } from '../../assets/icons/chevron-right.svg';
import { upsertTask, getTaskById } from '../../api/task';
import { useHistory } from 'react-router-dom';
import { dummyTasks } from '../../const';
export default (props: any) => {
    const [open, setOpen] = useState<boolean>(props.isOpen);
    const [initTask, setInitTask] = useState({
        title: '',
        location: '',
        image: '',
        photoStyle: '',
        price: 0,
    });
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
    const history = useHistory();
    useEffect(() => {
        console.log('eoeoe')
        console.log(props)
        // getTaskById(props.taskId).then(task => {
        //     setInitTask(task);
        // });
        setInitTask(dummyTasks[0]);
    }, []);

    const handleChange = (field: string) => (e: any) => {
        setTaskInfo({
            ...taskInfo,
            [field]: e.target.value,
        });
    };
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
    const submit = (e: any) => {
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
            upsertTask(props.taskId, task).then(res => {
                console.log(res);
                history.push('/console');
            });
            // history.push('/');
        }
    };
    return (
        <Dialog open={open} onClose={() => setOpen(false)} fullWidth={true} className="dialog">
            <DialogTitle>
                <h3 className="dialogTitle">Edit task</h3>
            </DialogTitle>
            <DialogContent>
                <div className="row">
                    <div className="col-6">
                        <Input
                            variant="filled"
                            error={Boolean(errorText.taskname)}
                            helperText={errorText.taskname}
                            onChange={handleChange('taskname')}
                            label="Task name"
                            fullWidth
                            defaultValue={initTask.title}
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
                            defaultValue={initTask.location}
                        />
                    </div></div>
                <div className="row createTaskTitle">
                    <div className="col-6">
                        <Input
                            variant="filled"
                            error={Boolean(errorText.image)}
                            helperText={errorText.image}
                            onChange={handleChange('image')}
                            label="Cover image"
                            fullWidth
                            defaultValue={initTask.image}
                        />
                    </div>
                    <div className="col-6">
                        <FormControl variant="filled" fullWidth>
                            <InputLabel>Task type</InputLabel>
                            <Select onClick={handleChange('tasktype')} defaultValue={initTask.photoStyle}>
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
                            defaultValue={initTask.price}
                        />
                    </div>
                    <div className="col-6 createTaskTitle">
                        <Button type="invert" onClick={submit} fullWidth>
                            Launch Task
                            <Chevron style={{ strokeWidth: 1 }} />
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
};
