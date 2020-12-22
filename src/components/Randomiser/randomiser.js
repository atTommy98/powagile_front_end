import React, { useState, useEffect } from "react";

// Material UI
import Button from "@material-ui/core/Button";

// Custom components
import Timer from "../../components/Timer/Timer.js";

export default function Randomiser({
  array,
  timeInSeconds,
  timeBetweenSpeakers,
}) {
  const [choosenName, setChoosenName] = useState("");
  const [timerToggle, setTimerToggle] = useState(true);

  function selectRandomOption() {
    const randomName = Math.floor(Math.random() * array.length);
    if (array.length !== 0) {
      const displayName = array.splice(randomName, 1)[0];
      setChoosenName(displayName.name);
    } else {
      setChoosenName("No more Players");
    }

    setTimerToggle(false);

    setTimeout(function () {
      setTimerToggle(true);
    }, timeBetweenSpeakers * 1000);
  }

  useEffect(() => {
    selectRandomOption();
  }, []);

  return (
    <div className="randomiser">
      {timerToggle === false ? (
        <h3>It is now {choosenName}'s turn! Get Ready!</h3>
      ) : (
        <h3>It is now {choosenName}'s turn! Go!</h3>
      )}
      {choosenName !== "No more Players" && timerToggle === true ? (
        <Timer timeInSeconds={timeInSeconds} />
      ) : null}

      <br />
      <br />

      <Button id="selectRandomOption" onClick={selectRandomOption}>
        Next Participant &rarr;
      </Button>
    </div>
  );
}
