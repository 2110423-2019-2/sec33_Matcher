import React from "react";
import { Row, Col } from "antd";
import "antd/dist/antd.css";
import "./index.css";

export default () => {
  return (
    <Row className="navbar-with-logo" justify="space-around" type="flex">
      <Col className="logo-text" span={3}>
        <h5 className="navbar-item-logo">matcher</h5>
      </Col>
      <Col span={3}>
        <p className="navbar-item">Workshops</p>
      </Col>
      <Col span={3}>
        <p className="navbar-item">Add new</p>
      </Col>
      <Col span={3}>
        <p className="navbar-item">Manage</p>
      </Col>
    </Row>
  );
};
