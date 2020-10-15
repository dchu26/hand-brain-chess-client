import React from "react";
import Chessboard from "chessboardjsx";
import io from "socket.io-client";
import "./ChessClient.css";

class ChessClient extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      position: "start",
      currPiece: "",
    }
    this.onSquareClick = this.onSquareClick.bind(this);
    this.socket = io(process.env.REACT_APP_SERVER_URL);
  }

  componentDidMount() {
    this.socket.on("position", position => {
      this.setState({
        position: position,
        currPiece: ""
      });
    });
  }

  onSquareClick(square) {
    this.setState({
      currPiece: square
    });
    let move = {from: this.state.currPiece, to: square, promotion: "q"};
    this.socket.emit("move", move);
  }

  render() {
    return (
      <div className="ChessClient">
        <div className="chessboard">
          <Chessboard
            position={this.state.position}
            draggable={false}
            onSquareClick={this.onSquareClick}
          />
        </div>
        <div className="chessboard">
          <Chessboard
            position={this.state.position}
            draggable={false}
          />
        </div>
      </div>
    );
  }
}

export default ChessClient;