import React, { Fragment } from 'react';
import Rating from '@material-ui/lab/Rating';
import './index.scss';

interface CommentProp {
    firstname: string,
    lastname: string,
    rating: number,
    comment?: string,
    profilePic?: string
}

const awesome = '/images/awesome.png';

export default ({ firstname, lastname, rating, comment, profilePic = awesome }: CommentProp) => <Fragment>
    <div className="row commentBox">
        <div className="col-8">
            <div className="row commentTitle">
                <p>{firstname} {lastname}</p>
            </div>
            <div className="row commentTitle">
                <Rating
                    size="medium"
                    value={rating}
                    readOnly={true}
                    precision={0.5}
                />
            </div>
        </div>
        <div className="col-4">
            <img className="commenterPic" src={profilePic} />
        </div>
    </div>
    <div className="row">
        <div className="col-12">
            <p className="commentText">{comment}</p>
        </div>
    </div>
</Fragment>