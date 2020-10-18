import React from "react";
import {
  withRouter
} from "react-router-dom";
import socket from "../socket";

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.configureSocket();
  }

  configureSocket() {
    socket.on("createdRoom", roomId => {
      this.props.history.push(roomId);
    })
  }

  render() {
    return (
      <button className="play" onClick={this.createRoom}>Play</button>
    );
  }

  createRoom() {
    socket.emit("createRoom");
  }
}

export default withRouter(Home);