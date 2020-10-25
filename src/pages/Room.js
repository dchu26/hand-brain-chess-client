import React from "react";
import socket from "../socket";
import Lobby from "./Lobby";
import ChessClient from "./ChessClient";

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phase: ""
    }
    this.configureSocket();
  }

  configureSocket() {
    socket.emit("login", localStorage.getItem("userId"));

    socket.on("loggedIn", userInfo => {
      localStorage.setItem("userId", userInfo.userId);
      if (localStorage.getItem("userName") === null) {
        localStorage.setItem("userName", userInfo.name);
      }
      socket.emit("joinRoom", window.location.pathname);
    });

    socket.on("joinedRoom", phase => {
      this.setState({
        phase: phase
      });
    });

    socket.on("startedGame", () => {
      this.setState({
        phase: "game"
      });
    });
  }

  render() {
    return (
      <div>
        {this.state.phase === "lobby" && <Lobby></Lobby>}
        {this.state.phase === "game" && <ChessClient></ChessClient>}
      </div>
    );
  }
}

export default Room;