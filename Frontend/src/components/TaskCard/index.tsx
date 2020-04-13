import React, { useState, useEffect, useContext } from 'react';
import { ReactComponent as MapPin } from '../../assets/icons/map-pin.svg';
import { ReactComponent as More } from '../../assets/more-vertical.svg';
import { Button } from '..';
import './index.scss';
import { Menu, MenuItem } from '@material-ui/core'
import { AuthContext } from '../../context/AuthContext';
import Rating from '@material-ui/lab/Rating';

interface UserCardProps {
    name?: string;
    location?: string;
    profilePic?: string;
    options?: any;
}

interface ReviewProps {
    rating?: number | null;
    comment?: string | null;
}

interface TaskCardProps extends UserCardProps {
    price?: number;
    thumbnail?: string;
    button?: string;
    onClick?: Function;
    options?: any;
    disable?: boolean;
    review?: boolean;
    rating?: number | null;
    comment?: string | null;
    taskId?: string;
}

const UserCard = ({
    name = 'User Name',
    location = 'Job Location',
    profilePic = '/images/profile-placeholder.png',
    options = null,
}: UserCardProps) => {
    const [anchor, setAnchor] = useState<HTMLElement | null>(null);
    const openMenu = (event: any) => {
        console.log(options)
        setAnchor(event.currentTarget);
    }
    const closeMenu = () => {
        setAnchor(null);
    }
    const action = (act: any) => {
        act();
        closeMenu();
    }
    return (
        <div className="row left">
            <div className="col-3">
                <div className="imageCropper">
                    <img src={profilePic} className="rounded" alt="profile" />
                </div>
            </div>
            <div className="col-8">
                <div className="row taskHeaderText">{name}</div>
                <div className="row taskHeaderText location">
                    <MapPin /> {location}
                </div>
            </div>
            <div className="col-1">{options !== null && <More onClick={openMenu} />}</div>
            <Menu anchorEl={anchor} keepMounted open={Boolean(anchor)} onClose={closeMenu}>
                {options}
            </Menu>
        </div >
    );
}
const Review = ({ rating = null, comment = null }: ReviewProps) => {
    const { auth } = useContext(AuthContext);
    const NoReview = () => <div><hr /><h6 className="content">Don't have a review yet</h6></div>

    return (
        <div className="ratingTaskCardContainer">
            {
                rating === null ?
                    (<NoReview />) : (
                        <div>
                            <hr />
                            <div className="row activeContent">
                                <div className="col-6">
                                    <p>{auth.role === 'customer' ? 'Your review' : 'User review'}</p>
                                </div>
                                <div className="col-6">
                                    <Rating value={rating} readOnly />
                                </div>
                            </div>
                            <div className="comment">
                                <p>{`"${comment}"`}</p>
                            </div>
                        </div>
                    )
            }
        </div >
    )
}
export default ({
    name,
    location,
    profilePic,
    price = 0,
    thumbnail = '/images/horizontal-placeholder.png',
    button = 'Get',
    onClick = () => { },
    options = null,
    disable = false,
    rating = null,
    comment = null,
    review = false,
}: TaskCardProps) => (
        <div style={{ display: 'inline-flex' }}>
            <div className="taskCardContainer">
                <UserCard name={name} location={location} profilePic={profilePic} options={options} />
                <div className="row">
                    <div className="col-12">
                        <img src={thumbnail} className="taskPic" alt="task" />
                    </div>
                </div>
                <div className="row">
                    <div className="col-6 left">
                        <p className="taskPriceTag">
                            ฿ <span className="price">{price}</span> / hr
                    </p>
                    </div>
                    <div className="col-6">
                        <Button onClick={onClick} disable={disable || (review && rating !== null)}>{review && rating !== null ? 'Reviewed' : button}</Button>
                    </div>
                </div>
                {
                    review && <Review rating={rating} comment={comment} />
                }
            </div>

        </div>
    );
