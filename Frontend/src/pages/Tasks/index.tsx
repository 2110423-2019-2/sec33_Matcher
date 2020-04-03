import React, { useEffect, useState } from 'react';
import './index.scss';
import { PHOTO_CATEGORIES, dummyTasks } from '../../const';
import { TaskCard, Input, Button } from '../../components';
import { getAvailableTasks, matchTask } from '../../api/task';
import { DialogContent, DialogContentText, DialogActions, Dialog, DialogTitle, Slider } from '@material-ui/core';
export default () => {
    const [dialog, setDialog] = useState(false);
    const [tasks, setTasks] = useState<Array<any>>([]);
    const [dialogData, setDialogData] = useState({
        location: '',
        priceRange: [0, 20000],
    });
    const [taskFilter, setTaskFilter] = useState({
        photoStyle: '',
        location: '',
        priceRange: [0, 20000],
    });
    useEffect(() => {
        getAvailableTasks()
            .then(tasks => {
                console.log(tasks);
                setTasks(tasks);
            })
            .catch(err => console.log(err));
    }, []);
    const filteredTasks = tasks.filter(
        task =>
            (task.photoStyle === taskFilter.photoStyle || taskFilter.photoStyle === '') &&
            task.location.includes(taskFilter.location) &&
            task.price >= taskFilter.priceRange[0] &&
            task.price <= taskFilter.priceRange[1],
    );

    const onclick = (category: string) => (e: any) => {
        if (taskFilter.photoStyle === category) {
            setTaskFilter({
                ...taskFilter,
                photoStyle: '',
            });
        } else {
            setTaskFilter({
                ...taskFilter,
                photoStyle: category,
            });
        }
    };

    const closeDialog = () => {
        setDialog(false);
    };

    const handleChange = (field: string) => (e: any) => {
            setDialogData({
                ...dialogData,
                [field]: e.target.value,
            });
    };

    const handleSlider = (e: any, Val: number | number[]) => {
        setDialogData({
            ...dialogData,
            priceRange: Val as number[],
        });
    };

    const onFilter = () => {
        setTaskFilter({
            ...taskFilter,
            location: dialogData.location,
            priceRange: dialogData.priceRange,
        });
        setDialog(false);
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
                                className={`${category === taskFilter.photoStyle ? 'activeFilter' : ''} pButton`}
                            >
                                {category}
                            </p>
                        );
                    })}
                </div>
                <div className="sortBy">
                    <p
                        onClick={() => {
                            setDialog(true);
                        }}
                        className="pButton"
                    >
                        more filter
                    </p>
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
            <Dialog open={dialog} onClose={closeDialog} fullWidth={true}>
                <DialogTitle className="dialogTitle">Additional Filter</DialogTitle>
                <DialogContent>
                    <div className="locationIn">
                        <Input
                            variant="filled"
                            value={dialogData.location}
                            onChange={handleChange('location')}
                            label="Location"
                            fullWidth
                        />
                    </div>
                    <h6 className="dialogLabel">Price</h6>
                    <div className="row">
                        <div className="col-12">
                            <Slider
                                value={dialogData.priceRange}
                                min={0}
                                max={20000}
                                onChange={handleSlider}
                                valueLabelDisplay="auto"
                                marks={[
                                    {
                                        value: 0,
                                        label: 'min',
                                    },
                                    {
                                        value: 20000,
                                        label: 'max',
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button type="outlined" onClick={closeDialog}>
                        Cancel
                    </Button>
                    <Button onClick={onFilter}>Apply Filter</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};
