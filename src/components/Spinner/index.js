import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";

export default function MyWheel() {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  // Displayed wheel
  const [wheelData, setWheelData] = useState([
    {
      option: "Daniela",
      style: { backgroundColor: "green", textColor: "black" },
    },
    { option: "Jon", style: { backgroundColor: "blue", textColor: "black" } },
    {
      option: "Tommy",
      style: { backgroundColor: "yellow", textColor: "black" },
    },
    {
      option: "Kawalpreet",
      style: { backgroundColor: "red", textColor: "black" },
    },
    {
      option: "Stefan",
      style: { backgroundColor: "pink", textColor: "black" },
    },
  ]);
  // Data for next spin
  const [wheelDataNextSpin, setWheelDataNextSpin] = useState("");

  const handleSpinClick = () => {
    // If the "Next Spin" data is not blank
    if (wheelDataNextSpin !== "") {
      setWheelData(wheelDataNextSpin);
    }

    const newPrizeNumber = Math.floor(Math.random() * wheelData.length);
    console.log(`newprize number is:${newPrizeNumber}`);

    setPrizeNumber(newPrizeNumber);

    const newState = [...wheelData];
    newState.splice(newPrizeNumber, 1);

    console.log(`My New State Is: ${newState}`);

    setWheelDataNextSpin(newState);

    setMustSpin(true);
  };

  return (
    <>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={wheelData}
        onStopSpinning={() => {
          setMustSpin(false);
        }}
      />
      <button onClick={handleSpinClick}>SPIN</button>
    </>
  );
}
