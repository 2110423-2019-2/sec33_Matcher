import React from "react";
import "./index.css";
import { Button, VerticalCard, TaskCard } from "../../components/index";
import { ReactComponent as Chevron } from '../../assets/icons/chevron-right.svg';
import camera from '../../assets/camera.svg';
import gradcard from '../../assets/vcard/graduation.svg';
export default () => {
  return (
    <div className="home">
      <div className="home-sub-title">
        <div className="line-before-home-sub-title" />
        <h5>A picture is worth a thousand words</h5>
      </div>
      <div className="home-title">
        <h1>Memorize your scene <br></br>with quality shots ...</h1>
      </div>
      
      <div className="pic">
        <img src={camera}/>
      </div>
      <br></br>

      <div className="home-button-line"> 
        <Button type="filled">Find jobs</Button>
        <Button type="outlined">Create task</Button> 
      </div>

      <div className="seeBlock">
        <h5>see all task</h5>
      </div>
      
      <div className="matcherBlock">
        <h5>© Matcher inc.</h5>
      </div>
      <br></br>
      
      <div className="blank"></div>

      <div className="jobby">
      <h5>Jobs near by you</h5>
      </div>

      <div className="seeall">
      <h5>see all <Chevron /> </h5>
      </div>

      <div className="blank2"></div>
        
      <div className="task">
            <TaskCard thumbnail="https://picsum.photos/200/300" name="John Doe" location="Siam Paragon" price={300}/>
            <TaskCard thumbnail="https://picsum.photos/200/300" name="John Doe" location="Siam Paragon" price={300}/>
            <TaskCard thumbnail="https://picsum.photos/200/300" name="John Doe" location="Siam Paragon" price={300}/>
            <TaskCard thumbnail="https://picsum.photos/200/300" name="John Doe" location="Siam Paragon" price={300}/>
            <TaskCard thumbnail="https://picsum.photos/200/300" name="John Doe" location="Siam Paragon" price={300}/>
            <TaskCard thumbnail="https://picsum.photos/200/300" name="John Doe" location="Siam Paragon" price={300}/>
        </div>

      <div className="jobby">
      <h5>Photo types</h5>
      </div>

      <div className="vcard">
            <VerticalCard src="/images/type-product.png" alt="product" text="Product" />
            <img src={gradcard}/>
      </div>

      <div className="matcherBlock2">
        <h5>© Matcher inc.</h5>
      </div>

        
        
    

      </div>

    
  );
};

