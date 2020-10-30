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
      players: []
    };
    this.configureSocket();
  }

  configureSocket() {
    socket.emit("getLobby");
    socket.on("lobby", players => {
      console.log(players);
      this.setState({
        players: players
      });
    });
  }

  chooseRole(role) {
    socket.emit("chooseRole", role);
  }

  getRoles() {
    let players = this.state.players;
    let roles = [[], [], [], []];
    for (let player of players) {
      roles[player[1]].push(player[0]);
    }
    let lists = ["", "", "", ""];
    for (let i = 0; i < roles.length; i++) {
      for (let userId of roles[i]) {
        lists[i] += "♟️";
      }
    }
    return lists;
  }

  copy() {
    let link = document.getElementById("link");
    link.focus();
    let url = window.location.hostname + window.location.pathname;
    navigator.clipboard.writeText(url);
  }

  render() {
    let lists = this.getRoles();
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
                  <Col><Button size="lg" onClick={() => this.chooseRole(0)}>Brain</Button></Col>
                </Row>
                <Row><Col className="piece">{lists[0]}</Col></Row>
              </Col>
              <Col>
                <Row>
                  <Col><Button size="lg" onClick={() => this.chooseRole(1)}>Hand</Button></Col>
                </Row>
                <Row><Col className="piece">{lists[1]}</Col></Row>
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
                  <Col><Button size="lg" onClick={() => this.chooseRole(2)}>Brain</Button></Col>
                </Row>
                <Row><Col className="piece">{lists[2]}</Col></Row>
              </Col>
              <Col>
                <Row>
                  <Col><Button size="lg" onClick={() => this.chooseRole(3)}>Hand</Button></Col>
                </Row>
                <Row><Col className="piece">{lists[3]}</Col></Row>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className="h-25">
          <Col>
            <Row><Col><p className="header">Share This Room</p></Col></Row>
            <Row>
              <Col className="w-75">
                <a id="link" href={window.location.hostname + window.location.pathname}>
                  {window.location.hostname + window.location.pathname}
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