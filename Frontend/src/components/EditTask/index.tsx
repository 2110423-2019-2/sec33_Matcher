import React, { useState, useEffect } from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
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
export default ({ init }: any) => {
    const [task, setTask] = useState({
        title: '',
        location: '',
        image: '',
        photoStyle: '',
        price: '',
    });
    const [errorText, setErrorText] = useState({
        title: '',
        location: '',
        image: '',
        price: '',
    });
    const history = useHistory();
    useEffect(() => {
        setTask(init);
        console.log(init);
    }, [init])
    const handleChange = (field: string) => (e: any) => {
        setTask({
            ...task,
            [field]: e.target.value,
        });
    };
    const validate = () => {
        setErrorText({
            ...errorText,
            title: task.title.length === 0 ? 'title cannot be empty.' : '',
            location: task.location.length === 0 ? 'Location cannot be empty.' : '',
            image: task.image.length === 0 ? 'Image cannot be empty.' : '',
            price: task.price.length === 0 ? 'Price cannot be empty.' : '',
        });
        if (task.title.length === 0) return false;
        if (task.location.length === 0) return false;
        if (task.image.length === 0) return false;
        if (task.price.length === 0) return false;
        return true;
    };
    const submit = (e: any) => {
        e.preventDefault();
        // console.log(task)
        if (validate()) {
            upsertTask(init._id, { ...task, price: parseFloat(task.price) }).then(res => {
                console.log(res);
                history.push('/console');
            }).catch(err => console.log(err));
        }
    };
    return (
        <div>
            <div className="row">
                <div className="col-6">
                    <Input
                        variant="filled"
                        error={Boolean(errorText.title)}
                        helperText={errorText.title}
                        onChange={handleChange('title')}
                        label="Task name"
                        fullWidth
                        value={task.title}
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
                        value={task.location}
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
                        value={task.image}
                    />
                </div>
                <div className="col-6">
                    <FormControl variant="filled" fullWidth>
                        <InputLabel>Task type</InputLabel>
                        <Select onClick={handleChange('tasktype')} value={task.photoStyle}>
                            <MenuItem value='PRODUCT'>Product</MenuItem>
                            <MenuItem value='PLACE'>Place</MenuItem>
                            <MenuItem value='RESTAURANT'>Cafe & Restaurant</MenuItem>
                            <MenuItem value='GRADUATION'>Graduation</MenuItem>
                            <MenuItem value='WEDDING'>Wedding</MenuItem>
                            <MenuItem value='EVENT'>Event</MenuItem>
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
                        value={task.price}
                    />
                </div>
                <div className="col-6 createTaskTitle">
                    <Button type="invert" onClick={submit} fullWidth>
                        Save
                            <Chevron style={{ strokeWidth: 1 }} />
                    </Button>
                </div>
            </div>
        </div>
    );
};
