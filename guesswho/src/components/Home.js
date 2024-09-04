import React from "react";
import "../styles/Home.css";

function Home({ stateChanger, ...rest }) {
  return (
    <div className="main-menu">
      <h2>
        Devine des champions de League of Legends avec une partie du splashart
      </h2>

      <button onClick={() => stateChanger(true)}>C'est parti !</button>
    </div>
  );
}

export default Home;
