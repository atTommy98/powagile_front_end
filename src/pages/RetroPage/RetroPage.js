// React
import React, { useState } from "react";

//Customer Component
import FourLsRetro from "./FourLsRetro";
import SpeedCar from "./SpeedCar";
function Retro() {
  const [fourLsRetroActive, setFourLsRetroActive] = useState(false);
  const [speedCarActive, setSpeedCarActive] = useState(false);

  function startFourLsRetro() {
    setFourLsRetroActive(true);
    setSpeedCarActive(false);
  }
  function startSpeedCarActive() {
    setSpeedCarActive(true);
    setFourLsRetroActive(false);
  }
  return (
    <div
      className="Retro"
      style={{
        backgroundImage: `url(https://wac-cdn.atlassian.com/dam/jcr:9748cdab-0642-4489-915c-eb4482b6f680/4%20Ls_metadata@2x.png)`,
      }}
    >
      <h2>Pow!Agile® Retrospective Board™</h2> <br />
      <div>
        <h4>4Ls Retrospective</h4>
        <button onClick={startFourLsRetro}>Play 4Ls</button>
        {fourLsRetroActive ? <FourLsRetro /> : null}
      </div>
      <br />
      <br />
      <div>
        <h4>Speed Car</h4>
        <button onClick={startSpeedCarActive}>Play SpeedCar</button>
        {speedCarActive ? <SpeedCar /> : null}
      </div>
    </div>
  );
}

export default Retro;
