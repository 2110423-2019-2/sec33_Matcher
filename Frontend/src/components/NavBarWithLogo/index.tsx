import React from "react";
import "./index.css";
import { Row, Col } from "antd";

export default () => {
  return (
    <Row>
      <div className="container">
        <ul>
          <li className="one">
            <a href="#">Uno</a>
          </li>
          <li className="two">
            <a href="#">Dos</a>
          </li>
          <li className="three">
            <a href="#">Tres</a>
          </li>
          <li className="four">
            <a href="#">Quatro</a>
          </li>
          <hr />
        </ul>
      </div>
    </Row>
  );
};
