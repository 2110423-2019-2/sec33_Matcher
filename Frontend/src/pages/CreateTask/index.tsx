import React, { useState, Fragment, Suspense, useContext, useEffect } from 'react';
import './index.scss';
import { Input, Button, Modal } from '../../components';
import { ReactComponent as Chevron } from '../../assets/icons/chevron-right.svg';
import { useHistory, Redirect } from 'react-router-dom';
import { upsertTask } from '../../api/task';
import { Select } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { AuthContext } from '../../context/AuthContext';

export default () => {
    const [taskInfo, setTaskInfo] = useState({
        taskname: '',
        location: '',
        image: '',
        tasktype: 'PRODUCT',
        price: '',
    });
    const [errorText, setErrorText] = useState({
        taskname: '',
        location: '',
        image: '',
        price: '',
    });
    const { auth } = useContext(AuthContext);
    const [confirm, setConfirm] = useState(false);
    const closeConfirm = () => setConfirm(false)
    const history = useHistory();
    const confirmTask = (e: any) => {
        e.preventDefault();
        if (validate()) {
            setConfirm(true);
        }
    }

    const validate = () => {
        setErrorText({
            ...errorText,
            taskname: taskInfo.taskname.length === 0 ? 'Taskname cannot be empty.' : '',
            location: taskInfo.location.length === 0 ? 'Location cannot be empty.' : '',
            image: taskInfo.image.length === 0 ? 'Image cannot be empty.' : '',
            price: isNaN(parseFloat(taskInfo.price)) || parseFloat(taskInfo.price) < 0 ? 'Invalid price.' : '',
        });
        if (taskInfo.taskname.length === 0) return false;
        if (taskInfo.location.length === 0) return false;
        if (taskInfo.image.length === 0) return false;
        if (isNaN(parseFloat(taskInfo.price)) || parseFloat(taskInfo.price) < 0) return false;
        return true;
    };

    const handleChange = (field: string) => (e: any) => {
        setTaskInfo({
            ...taskInfo,
            [field]: e.target.value,
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (validate()) {
            const task = {
                title: taskInfo.taskname,
                location: taskInfo.location,
                image: taskInfo.image,
                photoStyle: taskInfo.tasktype,
                price: parseFloat(taskInfo.price),
            }
            upsertTask('', task).then(() => {
                closeConfirm();
                history.push('/console?tab=task')

            }).catch(err => {
                console.log(err);
            })
        }
    }
    return (
        auth.role === 'photographer' ? (<Redirect to='/console?tab=task' />) :
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
                                <InputLabel>Photo style</InputLabel>
                                <Select onClick={handleChange('tasktype')} defaultValue="PRODUCT">
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
                            <Button type="invert" onClick={confirmTask} fullWidth>
                                Launch Task
                            <Chevron style={{ strokeWidth: 1 }} />
                            </Button>
                        </div>
                    </div>
                </form>
                <Modal
                    open={confirm}
                    close={closeConfirm}
                    title='Do you want to create the following task ?'
                    description={
                        <Fragment>
                            <h6 className="confirm-text"><span>Task name: </span>{taskInfo.taskname}</h6>
                            <h6 className="confirm-text"><span>Location: </span>{taskInfo.location}</h6>
                            <img src={taskInfo.image} alt="cover" className="prev-cover" />
                            <h6 className="confirm-text"><span>Task type: </span>{taskInfo.tasktype}</h6>
                            <h6 className="confirm-text"><span>Price rate (per hour): </span>{taskInfo.price}</h6>
                        </Fragment>
                    }
                    action={
                        <Fragment>
                            <Button fullWidth type="outlined" onClick={closeConfirm}>Cancel</Button>
                            <Button fullWidth onClick={handleSubmit}>Submit</Button>
                        </Fragment>
                    }

                />
            </div>
    );
};