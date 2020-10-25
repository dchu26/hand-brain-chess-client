import React from "react";
import socket from "../socket";
import "../styles/Lobby.css";

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
    let lists = [[], [], [], []];
    for (let i = 0; i < roles.length; i++) {
      let list = [];
      for (let userId of roles[i]) {
        if (userId === localStorage.getItem("userId")) {
          list.push(<li>You</li>);
        }
        else {
          list.push(<li>Player</li>);
        }
      }
      lists[i] = <ul>{list}</ul>;
    }
    return lists;
  }

  render() {
    let lists = this.getRoles();
    return (
      <div>
        <div>
          <h1>White</h1>
          <button onClick={() => this.chooseRole(0)}>Brain</button>
          {lists[0]}
          <button onClick={() => this.chooseRole(1)}>Hand</button>
          {lists[1]}
        </div>
        <div>
          <h1>Black</h1>
          <button onClick={() => this.chooseRole(2)}>Brain</button>
          {lists[2]}
          <button onClick={() => this.chooseRole(3)}>Hand</button>
          {lists[3]}
        </div>
      </div>
    );
  }
}

export default Lobby;