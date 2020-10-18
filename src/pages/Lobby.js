import React from "react";
import socket from "../socket";

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: new Map()
    };
    this.configureSocket();
  }

  configureSocket() {
    socket.emit("getLobby");
    socket.on("lobby", players => {
      this.setState({
        players: players
      });
    });
  }

  render() {
    return (
      <div>
        <div>
          <h1>White</h1>
          <h2>Brain</h2>
          <h2>Hand</h2>
        </div>
        <div>
          <h1>Black</h1>
          <h2>Brain</h2>
          <h2>Hand</h2>
        </div>
      </div>
    );
  }
}

export default Lobby;