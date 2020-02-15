import React from "react";
import "./index.css";
import { Button, VerticalCard, TaskCard } from "../../components/index";
import { ReactComponent as Chevron } from '../../assets/icons/chevron-right.svg';
import camera from '../../assets/camera.svg';
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
        <h5>@Matcher inc.</h5>
      </div>
      
        
       
      </div>

    
  );
};

