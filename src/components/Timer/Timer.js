import React, { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

// Parrots
import SlowParrot from "../../components/Parrots/hd/slowparrot.gif";
import FastParrot from "../../components/Parrots/hd/fastparrot.gif";

export default function Timer({ timeInSeconds = 20 }) {
  const [counter, setCounter] = useState(timeInSeconds);
  useEffect(() => {
    const timer = setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);
  console.log(counter);
  return (
    <div>
      {counter < 15 ? (
        <img src={FastParrot} alt="Fast Parrot"></img>
      ) : (
        <img src={SlowParrot} alt="Slow Parrot"></img>
      )}
      <CountdownCircleTimer
        isPlaying
        duration={counter}
        colors={[
          ["#004777", 0.33],
          ["#F7B801", 0.33],
          ["#A30000", 0.33],
        ]}
      >
        {({ remainingTime }) => counter}
      </CountdownCircleTimer>
    </div>
  );
}
