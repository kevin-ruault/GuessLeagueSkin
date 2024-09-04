import React, { useState, useEffect } from "react";
import "../styles/Game.css";
import { getRandomChamp } from "../utils/features";

function Game({ stateIsPlayingChanger, champions }) {
  const [champ, setChamp] = useState(null);
  const [guess, setGuess] = useState("");

  const getNewRandomChamp = () => {
    setChamp(getRandomChamp(champions));
  };

  useEffect(() => {
    if (!champ) {
      getNewRandomChamp();
    }
  }, [champ]);

  return (
    <div className="game">
      <button onClick={() => stateIsPlayingChanger(false)}>
        Retourner au menu
      </button>
      <h2>Quel champion a le splash art complet ?</h2>
      {champ ? <img src={champ.splashart} /> : "Loading..."}
      <p>Chaque essai dézoome un peu.</p>
      <input
        type="text"
        value={guess}
        onChange={(e) => setGuess(e.target.value)}
      />
      <button onClick={() => getNewRandomChamp()}>Recommencer</button>
      {/*<h1>League of Legends Champions</h1>
      <ul>
        {champions.map((champion) => (
          <li key={champion.id}>
            <p>{champion.name}</p>
          </li>
        ))}
      </ul>*/}
    </div>
  );
}

export default Game;
