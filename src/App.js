import React from "react";
import "./App.css";
import ChessClient from "./ChessClient";

function App() {
  return (
    <div>
      <h1 className={"header"}>
        The client (left) should match the server (right).
      </h1>
      <ChessClient></ChessClient>
      <h1 className={"header"}>
        Move the pieces on the client board.
      </h1>
    </div>
  );
}

export default App;
