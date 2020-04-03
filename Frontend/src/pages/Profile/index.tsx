import React, { useState } from 'react';
import './index.scss';
import { useParams } from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';
import { CommentCard } from '../../components';
import ProfileBackground from '../../assets/profilebg.svg';

interface Comment {
    ownerFirstname: string,
    ownerLastname: string,
    rating: number,
    comment?: string
}

interface Profile {
    firstname: string,
    lastname: string,
    score: number,
    comments: Comment[]
}

const initialProfile: Profile = {
    firstname: "Silas",
    lastname: "K. Oconner",
    score: 3.6,
    comments: [
        {
            ownerFirstname: 'Dai',
            ownerLastname: 'Anan',
            rating: 4,
            comment: "Lorem Ipsum is simply dummy text of the printing industry.",
        },
        {
            ownerFirstname: 'John',
            ownerLastname: 'Doe',
            rating: 5,
            comment: "Lorem Ipsum is simply dummy text of the printing industry.",
        },
        {
            ownerFirstname: 'Nisaruj',
            ownerLastname: 'Rattanaaram',
            rating: 2,
            comment: "Lorem Ipsum is simply dummy text of the printing industry.",
        }
    ]
}

export default () => {
    const { id } = useParams();
    const [profile, setProfile] = useState<any>(initialProfile);

    return (
        <div className="profileContainer">
            <div className="row">
                <div className="col-6">
                    <div className="row">
                        <div className="col">
                            <h4>Photographer &lsquo;{profile.firstname} {profile.lastname}&rsquo;</h4>
                        </div>
                    </div>
                    <div className="row avgRatingBox">
                        <div className="col-11">
                            <div className="row">
                                <div className="col-6 left avgRateText">
                                    <h5>Average Rate</h5>
                                </div>
                                <div className="col-6 right">
                                    <Rating
                                        size="large"
                                        value={profile.score}
                                        readOnly={true}
                                        precision={0.05}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12 breakingLine">
                                    <hr />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            <h5>Comment</h5>
                        </div>
                    </div>
                    <div className="row">
                        <div className="commentsBox">
                            {
                                profile.comments.map((comment: Comment) =>
                                    <CommentCard
                                        firstname={comment.ownerFirstname}
                                        lastname={comment.ownerLastname}
                                        rating={comment.rating}
                                        comment={comment.comment}
                                    />
                                )
                            }
                        </div>
                    </div>
                </div>
                <div className="col-6">
                    <img src={ProfileBackground} style={{ height: '70vh', position:'fixed', right: 0 }} />
                </div>
            </div>
        </div>
    )
}