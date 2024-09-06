import React, { useState, useEffect } from "react";
import "../styles/Game.css";
import { getRandomChamp, getRandomNum } from "../utils/scripts";
import { fetchApi } from "../utils/api";

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
    let selectedChamp = champions[Math.floor(Math.random() * champions.length)];
    fetchApi(
      `https://ddragon.leagueoflegends.com/cdn/14.17.1/data/fr_FR/champion/${selectedChamp.slug}.json`
    )
      .then((json) => {
        let skins = json.data[selectedChamp.name].skins;
        let newSplashart = skins[Math.floor(Math.random() * skins.length)];
        let str = newSplashart.id.substr(4);
        if (str[0] === "0") str = str.substr(1);
        selectedChamp.splashart = `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${selectedChamp.slug}_${str}.jpg`;
        setChamp(selectedChamp);
      })
      .catch((error) => {
        console.log(error);
      });
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
      if (scale > 1.5) setSplashartScale(scale - scale * 0.04);
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
