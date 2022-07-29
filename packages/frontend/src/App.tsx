import React from "react";
import logo from "./logo.svg";
import { io } from "socket.io-client";
import "./App.css";

const socket = io("ws://localhost:3333");

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button
          onClick={() => {
            socket.emit("reaction", {
              bidId: "0x12123-209.1",
              reactionId: "2",
            });
          }}
        >
          REACT
        </button>
      </header>
    </div>
  );
}

export default App;
