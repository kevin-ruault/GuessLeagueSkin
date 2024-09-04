import React, { useEffect, useState } from "react";
import "./App.css";
import Home from "./components/Home.js";
import Game from "./components/Game.js";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    console.log(isPlaying);
  }, [isPlaying]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Guess League Skin</h1>
      </header>
      {isPlaying ? (
        <Game stateChanger={setIsPlaying} />
      ) : (
        <Home stateChanger={setIsPlaying} />
      )}
    </div>
  );
}

export default App;
