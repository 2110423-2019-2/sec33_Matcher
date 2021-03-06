import React, { useEffect, useState, useContext } from 'react';
import './index.scss';
import { AuthContext } from '../../context/AuthContext';
import { Button, VerticalCard, TaskCard, PhotoType, Modal } from '../../components/index';
import { ReactComponent as Chevron } from '../../assets/icons/chevron-right.svg';
import { ReactComponent as ArrowRight } from '../../assets/icons/arrow-right.svg';
import { getAvailableTasks, acceptTask } from '../../api/task';
// import camera from '../../assets/camera.svg';
import social from '../../assets/icons/social icon.svg';
import { Link, useHistory } from 'react-router-dom';
import Lottie from 'react-lottie';
import LottieCamera from '../../assets/lottie-camera-home.json';

export default () => {
    const { auth, authDispatch } = useContext(AuthContext);
    const [tasks, setTasks] = useState<Array<any>>([]);
    const history = useHistory();
    useEffect(() => {
        getAvailableTasks()
            .then(tasks => {
                // console.log(tasks);
                setTasks(tasks);
            })
            .catch(err => console.log(err));
    }, []);

    const onAccept = (id: string) => (e: any) => {
        if (auth.role !== 'photographer') {
            alert("Only Photographer is allower to accept task!")
        } else {
            acceptTask(id).then((res) => {
                // console.log(res);
                history.push('/console?tab=task');
            }).catch(err => console.log(err))
        }
    };

    return (
        <div className="home">
            <div className="pad padTop">
                <div className="home-sub-title">
                    <div className="line-before-home-sub-title" />
                    <h5>A picture is worth a thousand words</h5>
                </div>
                <div className="home-title">
                    <h1>
                        Memorize your scene <br></br>with quality shots ...
                    </h1>
                </div>

                <div className="pic">
                    <Lottie options={{ animationData: LottieCamera }}
                        height={500}
                        width={500}
                    />
                    {/* <img src={camera} alt="camera" /> */}
                </div>
                <br /><br /><br /><br />

                <div className="home-button-line">
                    <Link to="/task">
                        <Button type="filled" className="homeBtn">Find jobs</Button>
                    </Link>
                    <Link to="/console?tab=create">
                        <Button type="outlined" className="homeBtn createTaskBtn">
                            Create task
                        </Button>
                    </Link>
                </div>
            </div>

            <div className="seeBlock">
                <Link to="/task">
                    <h5>see all task</h5>
                </Link>
                <ArrowRight/>
            </div>

            <div className="matcherBlock">
                <div className="matcherletter">
                    <h5>© Matcher inc.</h5>
                </div>
                <div className="socialicon">
                    <img src={social} alt="social icon" />
                </div>
            </div>
            <br></br>

            <div className="blank"></div>

            <div className="pad">
                {/* <div className="row">
                    <div className="col-6 left subHeader">
                        <h5>Jobs near by you</h5>
                    </div>
                    <div className="col-6 right subHeader seeall">
                        <Link to="/task">
                            <h5>see all <Chevron /></h5>
                        </Link>
                    </div>
                </div> */}
                <div className="jobNearby">
                    <div className="subHeader">
                        <h5>Jobs near by you</h5>
                    </div>
                    <div className="subHeader seeall">
                        <Link to="/task">
                            <h5>see all <Chevron /></h5>
                        </Link>
                    </div>
                </div>

                <div className="row task">
                    {tasks.map(task => {
                        return (
                            <div className="col">
                                <TaskCard
                                    onClick={onAccept(task._id)}
                                    name={task.title}
                                    location={task.location}
                                    profilePic={task.image}
                                    price={task.price}
                                    thumbnail={task.image}
                                />
                            </div>
                        );
                    })}
                    {!auth.isLogin && <p>Only Registered user can see Tasks</p>}
                </div>

                <PhotoType />
            </div>
        </div>
    );
};
