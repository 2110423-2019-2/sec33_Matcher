import React from "react";
import "./index.scss";
import { Button, VerticalCard, TaskCard, PhotoType } from "../../components/index";
import { ReactComponent as Chevron } from '../../assets/icons/chevron-right.svg';
import camera from '../../assets/camera.svg';
import social from '../../assets/icons/social icon.svg';
import graduation from '../../assets/vcard/graduation.svg';
import wedding from '../../assets/vcard/wedding.svg';
import event from '../../assets/vcard/event.svg';
import product from '../../assets/vcard/product.svg';
import place from '../../assets/vcard/place.svg';
import cafe from '../../assets/vcard/cafe.svg';
import { Link } from 'react-router-dom';

const categoryCards = [
  {
    src: graduation,
    alt: 'Graduation',
    text: 'Graduation'
  },
  {
    src: wedding,
    alt: 'Wedding',
    text: 'Wedding'
  },
  {
    src: event,
    alt: 'Event',
    text: 'Event'
  },
  {
    src: product,
    alt: 'Product',
    text: 'Product'
  },
  {
    src: place,
    alt: 'Place',
    text: 'Place'
  },
  {
    src: cafe,
    alt: 'Café & Restaurant',
    text: 'Café & Restaurant'
  },
]


export default () => {
  return (
    <div className="home">
      <div className="pad">
        <div className="home-sub-title">
          <div className="line-before-home-sub-title" />
          <h5>A picture is worth a thousand words</h5>
        </div>
        <div className="home-title">
          <h1>Memorize your scene <br></br>with quality shots ...</h1>
        </div>

        <div className="pic">
          <img src={camera} alt="camera" />
        </div>
        <br></br>

        <div className="home-button-line">
<<<<<<< HEAD
          <Button type="filled">Find jobs</Button>
          <Link to="/create"><Button type="outlined" className="createTaskBtn">Create task</Button></Link>
=======
          <Link to='/task'><Button type="filled">Find jobs</Button></Link>
          <Button type="outlined" className="createTaskBtn">Create task</Button>
>>>>>>> origin/dev_frontend
        </div>
      </div>

      <div className="seeBlock">
        <Link to='/task'><h5>see all task</h5></Link>
      </div>

      <div className="matcherBlock">
        <div className="matcherletter"><h5>© Matcher inc.</h5></div>
        <div className="socialicon"><img src={social} alt="social icon" /></div>
      </div>
      <br></br>

      <div className="blank"></div>

      <div className="pad">
        <div className="row">
          <div className="col-6 left subHeader">
            <h5>Jobs near by you</h5>
          </div>
          <div className="col-6 right subHeader seeall">
          <Link to='/task'><h5>see all <Chevron /></h5></Link>
          </div>
        </div>

        <div className="row task">
          <TaskCard thumbnail="https://picsum.photos/200/300" name="John Doe" location="Siam Paragon" price={300} />
          <TaskCard thumbnail="https://picsum.photos/200/300" name="John Doe" location="Siam Paragon" price={300} />
          <TaskCard thumbnail="https://picsum.photos/200/300" name="John Doe" location="Siam Paragon" price={300} />
          <TaskCard thumbnail="https://picsum.photos/200/300" name="John Doe" location="Siam Paragon" price={300} />
          <TaskCard thumbnail="https://picsum.photos/200/300" name="John Doe" location="Siam Paragon" price={300} />
          <TaskCard thumbnail="https://picsum.photos/200/300" name="John Doe" location="Siam Paragon" price={300} />
        </div>

        <PhotoType/>
      </div>
    </div>

  );
};

