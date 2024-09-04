import React, { useState, useEffect } from "react";
import { fetchChampions, getDetails } from "../utils/api.js";

function Game({ stateChanger, ...rest }) {
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

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log(champions);

  return (
    <div>
      <button onClick={() => stateChanger(false)}>Retourner au menu</button>
      <h1>League of Legends Champions</h1>
      <ul>
        {champions.map((champion) => (
          <li key={champion.id}>
            <p>{champion.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Game;
