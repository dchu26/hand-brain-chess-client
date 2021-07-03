import React from "react";
import {
  withRouter
} from "react-router-dom";
import socket from "../socket";
import "../styles/Home.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.configureSocket();
  }

  configureSocket() {
    socket.on("createdRoom", roomId => {
      this.props.history.push(roomId);
    })
  }

  render() {
    return (
      <Container className="home vh-100 d-flex flex-column" fluid>
        <Row className="h-25">
          <Col>
            <h1 className="title">Bluff Chess</h1>
          </Col>
        </Row>
        <Row>
          <Col className="rules">
            <h2>Rules</h2>
            <p>Normal chess but with bluffing :) </p>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button className="but" onClick={this.createRoom}>Play</Button>
          </Col>
        </Row>
      </Container>
    );
  }

  createRoom() {
    socket.emit("createRoom");
  }
}

export default withRouter(Home);