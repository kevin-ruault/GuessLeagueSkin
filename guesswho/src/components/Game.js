import React, { useState, useEffect } from "react";
import "../styles/Game.css";
import { getRandomChamp, getRandomNum } from "../utils/scripts";

function Game({ stateIsPlayingChanger, champions }) {
  const [champ, setChamp] = useState(null);
  const [guess, setGuess] = useState("");
  const [isGuessed, setIsGuessed] = useState(false);
  const [answeredChamps, setAnsweredChamps] = useState([]);
  const [remainingChamps, setRemainingChamps] = useState(champions);
  const [splashartXPos, setSplashartXPos] = useState(getRandomNum(-235, 60));
  const [splashartYPos, setSplashartYPos] = useState(getRandomNum(-60, 60));
  const [splashartScale, setSplashartScale] = useState(6);

  const newRandomChamp = () => {
    setIsGuessed(false);
    setChamp(getRandomChamp(champions));
    setAnsweredChamps([]);
    setRemainingChamps(champions);
    document.getElementById("focused").focus();
    setSplashartScale(6);
    setSplashartXPos(getRandomNum(-235, 60));
    setSplashartYPos(getRandomNum(-60, 60));
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
      let scale = splashartScale;
      //let xPos = splashartXPos;
      //let yPos = splashartYPos;
      if (scale > 2) setSplashartScale(scale - scale * 0.03);

      //setSplashartXPos(xPos + 10);
      //setSplashartYPos(yPos + 10);
    }
  };

  useEffect(() => {
    if (!champ) {
      newRandomChamp();
    }
  }, [champ]);
  console.log(splashartScale);
  return (
    <>
      <div className="game">
        <button onClick={() => stateIsPlayingChanger(false)}>
          Retourner au menu
        </button>
        <h2>Quel champion a le splash art complet ?</h2>
        <div className="splashart-container">
          {champ ? (
            <img
              className={isGuessed ? "revealed" : "splashart"}
              src={champ.splashart}
              style={{
                objectPosition: `${isGuessed ? "0" : splashartXPos}px ${
                  isGuessed ? "0" : splashartYPos
                }px`,
                transform: `scale(${isGuessed ? "1" : splashartScale})`,
              }}
            />
          ) : (
            "Loading..."
          )}
        </div>
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
      <div style={{ width: "400px", height: "300px" }}></div>
    </>
  );
}

export default Game;
