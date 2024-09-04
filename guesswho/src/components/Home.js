import React from "react";
import "../styles/Home.css";
import { getRandomChamp } from "../utils/features";

function Home({ stateIsPlayingChanger, champions, stateSelectedChampChanger }) {
  const handleClick = () => {
    stateSelectedChampChanger(getRandomChamp(champions));
  };

  return (
    <div className="main-menu">
      <h2>
        Devine des champions de League of Legends avec une partie du splashart
      </h2>

      <button onClick={() => stateIsPlayingChanger(true)}>C'est parti !</button>
    </div>
  );
}

export default Home;
