import React from "react";
import Chessboard from "chessboardjsx";
import socket from "../socket";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

class ChessClient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      boardState: {position: "", squares: {}, player: -1, isOver: false},
      currPiece: "",
      isConnected: false,
      squareStyles: {},
    }
    this.onSquareClick = this.onSquareClick.bind(this);
    this.configureSocket();
  }

  configureSocket() {
    socket.emit("getBoard");
    socket.on("board", boardState => {
      let squareStyles = this.getSquareStyles(boardState.squares, boardState.player);
      this.setState({
        boardState: boardState,
        isConnected: true,
        currPiece: "",
        squareStyles: squareStyles
      });
    });
  }

  getSquareStyles(squares, player) {
    let squareStyles = {};
    let style;
    if (player === 1 || player === 3) {
      style = {backgroundColor: "yellow"};
    }
    else if (player === 0 || player === 2) {
      style = {backgroundColor: "green"};
    }
    for (let square of squares) {
      squareStyles[square] = style;
    }
    return squareStyles;
  }

  onSquareClick(square) {
    this.setState({
      currPiece: square
    });
    let move = {from: this.state.currPiece, to: square, promotion: "q"};
    socket.emit("move", move);
  }

  reset(type) {
    socket.emit("reset" + type);
  }

  render() {
    let board;
    if (this.state.isConnected) {
      board = <Chessboard
        position={this.state.boardState.position}
        draggable={false}
        onSquareClick={this.onSquareClick}
        squareStyles={this.state.squareStyles}
        sparePieces={true}
      />
    }
    return (
      <Container>
        <Row>
          <Col>White Hand's Turn</Col>
        </Row>
        <Row>
          <Col></Col>
          <Col>{board}</Col>
          <Col>
            {this.state.boardState.isOver && 
              <div>
                <Button onClick={() => this.reset("Game")}>Reset Game</Button>
                <span> </span>
                <Button onClick={() => this.reset("Lobby")}>Reset Lobby</Button>
              </div>
            }
          </Col>
        </Row>
      </Container>
    );
  }
}

export default ChessClient;