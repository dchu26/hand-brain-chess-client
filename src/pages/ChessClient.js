import React from "react";
import Chessboard from "chessboardjsx";
import "../styles/ChessClient.css";
import socket from "../socket";

class ChessClient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: "start",
      currPiece: "",
      isConnected: false,
      squareStyles: {}
    }
    this.onSquareClick = this.onSquareClick.bind(this);
    this.configureSocket();
  }

  configureSocket() {
    socket.emit("getBoard");
    socket.on("board", boardState => {
      this.setState({
        isConnected: true,
        position: boardState.position,
        currPiece: "",
        squareStyles: this.getSquareStyles(boardState.squares)
      });
    });
  }

  getSquareStyles(squares) {
    let squareStyles = {};
    for (let square of squares) {
      squareStyles[square] = {backgroundColor: "green"};
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

  render() {
    let board;
    if (this.state.isConnected) {
      board = <Chessboard
        position={this.state.position}
        draggable={false}
        onSquareClick={this.onSquareClick}
        squareStyles={this.state.squareStyles}
      />
    }
    return (
      <div className="ChessClient">
        <div className="chessboard">
          {board}
        </div>
      </div>
    );
  }
}

export default ChessClient;