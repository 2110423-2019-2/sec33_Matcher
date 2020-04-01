import React from 'react';
import { ReactComponent as MapPin } from '../../assets/icons/map-pin.svg';
import { Button } from '..';
import './index.scss';

interface UserCardProps {
    name?: string;
    location?: string;
    profilePic?: string;
}

interface TaskCardProps extends UserCardProps {
    price?: number;
    thumbnail?: string;
    button?: string;
    onClick?: Function;
}

const UserCard = ({
    name = 'User Name',
    location = 'Job Location',
    profilePic = '/images/profile-placeholder.png',
}: UserCardProps) => (
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
        </div>
    );

export default ({
    name,
    location,
    profilePic,
    price = 0,
    thumbnail = '/images/horizontal-placeholder.png',
    button = 'Get',
    onClick = () => { },
}: TaskCardProps) => (
        <div style={{ display: 'inline-flex' }}>
            <div className="taskCardContainer">
                <UserCard name={name} location={location} profilePic={profilePic} />
                <div className="row">
                    <img src={thumbnail} className="taskPic" alt="task" />
                </div>
                <div className="row">
                    <div className="col-6 left">
                        <p className="taskPriceTag">
                            ฿ <span className="price">{price}</span> / hr
                    </p>
                    </div>
                    <div className="col-6">
                        <Button onClick={onClick}>{button}</Button>
                    </div>
                </div>
            </div>
        </div>
    );
