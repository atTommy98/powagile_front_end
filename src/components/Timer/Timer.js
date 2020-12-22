import React, { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
export default function Timer({ timeInSeconds = 20 }) {
  const [counter, setCounter] = useState(timeInSeconds);
  useEffect(() => {
    const timer = setTimeout(() => setCounter(counter - 1), 1000);
  }, [counter]);
  console.log(counter);
  return (
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
  );
}
