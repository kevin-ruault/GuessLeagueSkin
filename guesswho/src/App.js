import React, { useEffect, useState } from "react";
import "./App.css";
import Home from "./components/Home.js";
import Game from "./components/Game.js";
import { fetchChampions } from "./utils/api.js";
import { getDetails } from "./utils/scripts.js";

function App() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedChamp, setSelectedChamp] = useState(null);
  const [champions, setChampions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl =
      "https://ddragon.leagueoflegends.com/cdn/14.17.1/data/fr_FR/champion.json";

    // Appeler la fonction fetchChampions importée
    fetchChampions(apiUrl)
      .then((json) => {
        setChampions(getDetails(json.data));
      })
      .catch((error) => {
        setError(error);
      });
  }, []);

  useEffect(() => {
    if (selectedChamp) setIsPlaying(true);
  }, [selectedChamp]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Guess League Skin</h1>
      </header>
      {isPlaying ? (
        <Game
          stateIsPlayingChanger={setIsPlaying}
          champions={champions}
          selectedChamp={selectedChamp}
        />
      ) : (
        <Home
          stateIsPlayingChanger={setIsPlaying}
          champions={champions}
          stateSelectedChampChanger={setSelectedChamp}
        />
      )}
    </div>
  );
}

export default App;
