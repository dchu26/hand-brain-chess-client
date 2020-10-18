import React from "react";
import socket from "../socket";

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: {}
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

  chooseRole(role) {
    socket.emit("chooseRole", role);
  }

  render() {
    return (
      <div>
        <div>
          <h1>White</h1>
          <button onClick={() => this.chooseRole(0)}>Brain</button>
          <button onClick={() => this.chooseRole(1)}>Hand</button>
        </div>
        <div>
          <h1>Black</h1>
          <button onClick={() => this.chooseRole(2)}>Brain</button>
          <button onClick={() => this.chooseRole(3)}>Hand</button>
        </div>
      </div>
    );
  }
}

export default Lobby;