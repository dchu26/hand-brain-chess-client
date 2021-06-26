import React from "react";
import Chessboard from "chessboardjsx";
import socket from "../socket";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import "../styles/ChessClient.css";

class ChessClient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardState: {position: "", squares: {}, player: -1, isOver: false},
      currPiece: "",
      isConnected: false,
      squareStyles: {},
      orientation: "white",
      role: -1,
      options: []
    }
    this.onSquareClick = this.onSquareClick.bind(this);
    this.configureSocket();
  }

  configureSocket() {
    socket.emit("getBoard");
    socket.on("options", options => {
      let squareStyles = this.getSquareStyles(this.state.boardState.squares, this.state.boardState.player, this.state.boardState.checkSquare);
      for (let option of options) {
        squareStyles[option.to] = 
        {background: "radial-gradient(circle, forestgreen 36%, transparent 40%)"}
      }
      this.setState({
        options: options,
        squareStyles: squareStyles
      })
    });
    socket.on("board", boardState => {
      let squareStyles = this.getSquareStyles(boardState.squares, boardState.player, boardState.checkSquare);
      let role = this.state.role === -1 ? boardState.players.find(e => e[0] === localStorage.getItem("userId")) : this.state.role;
      let orientation = role !== undefined && (role[1] === 2 || role[1] === 3) ? "black" : "white";
      this.setState({
        boardState: boardState,
        isConnected: true,
        currPiece: "",
        squareStyles: squareStyles,
        role: role,
        orientation: orientation
      });
    });
  }

  toRole(role) {
    let name = "Spectator";
    switch (role) {
      case 0:
        name = "White Brain";
        break;
      case 1:
        name = "White Hand";
        break;
      case 2:
        name = "Black Brain";
        break;
      case 3:
        name = "Black Hand";
        break;
      default:
        name = "Spectator";
    }
    return name;
  }

  getSquareStyles(squares, player, checkSquare) {
    let squareStyles = {};
    let style;
    if (player === 1 || player === 3) {
      style = {backgroundColor: "plum"};
    }
    else if (player === 0 || player === 2) {
      style = {backgroundColor: "forestgreen"};
    }
    for (let square of squares) {
      squareStyles[square] = style;
    }
    squareStyles[checkSquare] = {backgroundColor: "indianred"};
    return squareStyles;
  }

  onSquareClick(square) {
    this.setState({
      currPiece: square
    });
    socket.emit("getOptions", square);
    let move = {from: this.state.currPiece, to: square, promotion: "q"};
    socket.emit("move", move);
  }

  reset(type) {
    socket.emit("reset" + type);
  }

  newLobby() {
    socket.emit("createRoom");
  }

  render() {
    let board;
    if (this.state.isConnected) {
      board = <Chessboard
        position={this.state.boardState.position}
        draggable={false}
        onSquareClick={this.onSquareClick}
        squareStyles={this.state.squareStyles}
        orientation={this.state.orientation}
      />
    }
    return (
      <Container fluid className="vh-100 d-flex flex-column">
        <Row className="h-20">
          <Col>
            <p className="text">
              {this.toRole(this.state.boardState.player)}'s Turn
            </p>
          </Col>
        </Row>
        <Row className="">
          <Col></Col>
          <Col>{board}</Col>
          <Col>
            {this.state.boardState.isOver && 
              <ButtonGroup vertical>
                <Button className="button" onClick={() => this.reset("Game")}>Reset Game</Button>
                <Button className="button" onClick={() => this.reset("Lobby")}>Reset Lobby</Button>
                <Button className="button" onClick={this.newLobby}>New Lobby</Button>
              </ButtonGroup>
            }
          </Col>
        </Row>
        <Row className="h-10">
          <Col>
            <p className="text">
              Your Role: {this.toRole(this.state.role[1])}
            </p>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ChessClient;