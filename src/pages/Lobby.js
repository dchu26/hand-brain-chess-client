import React from "react";
import socket from "../socket";
import "../styles/Lobby.css";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      buttons: ["secondary", "secondary", "secondary", "secondary"],
      lists: []
    };
    this.configureSocket();
  }

  configureSocket() {
    socket.emit("getLobby");
    socket.on("lobby", players => {
      this.getRoles(players);
    });
  }

  chooseRole(role) {
    socket.emit("chooseRole", role);
  }

  getRoles(players) {
    let b = ["secondary", "secondary", "secondary", "secondary"];
    let roles = [[], [], [], []];
    for (let player of players) {
      roles[player[1]].push(player[0]);
    }
    let lists = ["", "", "", ""];
    for (let i = 0; i < roles.length; i++) {
      for (let userId of roles[i]) {
        if (userId === localStorage.getItem("userId")) {
          lists[i] += i === 0 || i === 1 ? "♔" : "♚";
        }
        else {
          lists[i] += i === 0 || i === 1 ? "♘" : "♞";
        }
        if (lists[i].length === 1) {
          b[i] = "success";
        }
        else if (lists[i].length > 1){
          b[i] = "danger";
        }
      }
    }
    this.setState({
      lists: lists,
      buttons: b
    });
  }

  copy() {
    let link = document.getElementById("link");
    link.focus();
    let url = "https://" + window.location.hostname + window.location.pathname;
    navigator.clipboard.writeText(url);
  }

  render() {
    return (
      <Container fluid className="vh-100 d-flex flex-column lobby">
        <Row className="h-25">
          <Col><h1 className="header">Choose a Role</h1></Col>
        </Row>
        <Row className="roles h-50">
          <Col>
            <Row>
              <Col><h1 className="header">White</h1></Col>
            </Row>
            <Row>

              <Col>
                <Row>
                  <Col><Button variant={this.state.buttons[1]} size="lg" onClick={() => this.chooseRole(0)}>Hand</Button></Col>
                </Row>
                <Row><Col className="piece">{this.state.lists[1]}</Col></Row>
              </Col>
            </Row>
          </Col>
          <Col>
            <Row>
              <Col><h1 className="header">Black</h1></Col>
            </Row>
            <Row>
 
              <Col>
                <Row>
                  <Col><Button variant={this.state.buttons[3]} size="lg" onClick={() => this.chooseRole(1)}>Hand</Button></Col>
                </Row>
                <Row><Col className="piece">{this.state.lists[3]}</Col></Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="h-25">
          <Col>
            <Row><Col><p className="header">Share This Room</p></Col></Row>
            <Row>
              <Col className="w-75">
                <a id="link" href={"https://" + window.location.hostname + window.location.pathname}>
                  {"https://" + window.location.hostname + window.location.pathname}
                </a>
                <span> </span>
                <Button onClick={this.copy}>Copy</Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Lobby;