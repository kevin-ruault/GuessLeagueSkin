import React, { useState, useEffect } from "react";
import "../styles/Game.css";
import { getRandomChamp } from "../utils/features";

function Game({ stateIsPlayingChanger, champions }) {
  const [champ, setChamp] = useState(null);
  const [guess, setGuess] = useState("");
  const [isGuessed, setIsGuessed] = useState(false);
  const [answeredChamps, setAnsweredChamps] = useState([]);
  const [remainingChamps, setRemainingChamps] = useState(champions);

  const newRandomChamp = () => {
    setIsGuessed(false);
    setChamp(getRandomChamp(champions));
    setAnsweredChamps([]);
    setRemainingChamps(champions);
    document.getElementById("focused").focus();
  };

  const answerVerifier = (id) => {
    let answer = [];
    remainingChamps.forEach((element) => {
      if (element.id === id) {
        answer.push(element);
      }
    });
    setAnsweredChamps([...answer, ...answeredChamps]);
    const newArray = remainingChamps.filter((item) => item.id !== id);
    setRemainingChamps(newArray);
    setGuess("");
    if (answer[0].name === champ.name) {
      setIsGuessed(true);
    } else {
      document.getElementById("focused").focus();
    }
  };

  useEffect(() => {
    if (!champ) {
      newRandomChamp();
    }
  }, [champ]);

  return (
    <>
      <div className="game">
        <button onClick={() => stateIsPlayingChanger(false)}>
          Retourner au menu
        </button>
        <h2>Quel champion a le splash art complet ?</h2>
        {champ ? (
          <img
            className={isGuessed ? "revealed" : "splashart"}
            src={champ.splashart}
          />
        ) : (
          "Loading..."
        )}
        <p>Chaque essai dézoome un peu.</p>
        <div className="guess">
          <input
            id="focused"
            autoFocus
            type="text"
            disabled={isGuessed ? true : false}
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
          />

          {guess !== "" && (
            <div className="champs-preview">
              <ul>
                {remainingChamps
                  .filter((champions) =>
                    champions.name.match(new RegExp(guess, "i"))
                  )
                  .map((champion) => (
                    <li
                      key={champion.id}
                      onClick={() => answerVerifier(champion.id)}
                    >
                      <img src={champion.image} />
                      <p>{champion.name}</p>
                    </li>
                  ))}
              </ul>
            </div>
          )}
        </div>
        {isGuessed && (
          <button onClick={() => newRandomChamp()}>Recommencer</button>
        )}
      </div>
      <div className="answers">
        <ul>
          {answeredChamps.map((champion) => (
            <li
              style={
                champion.name === champ.name
                  ? { backgroundColor: "#108723" }
                  : { backgroundColor: "#b72828" }
              }
              key={champion.id}
              onClick={() => answerVerifier(champion.id)}
            >
              <img src={champion.image} />
              <p>{champion.name}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Game;
