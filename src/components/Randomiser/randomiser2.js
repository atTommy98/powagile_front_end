import React, { useState, useEffect } from "react";

// Material UI
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";

// Custom components
import Timer from "../Timer/Timer.js";

export default function Randomiser({
  array,
  timeInSeconds,
  timeBetweenSpeakers,
}) {
  const [choosenName, setChoosenName] = useState("");
  const [timerToggle, setTimerToggle] = useState(true);

  return (
    <div className="randomiser">
      <p>It's now the turn of...</p>
      <p className="selectedName">{choosenName}</p>
    </div>
  );
}
