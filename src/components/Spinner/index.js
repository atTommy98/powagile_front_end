import React, { useState } from "react";
import { Wheel } from "react-custom-roulette";
const data = [
  {
    option: "Daniela",
    style: { backgroundColor: "green", textColor: "black" },
  },
  { option: "Jon", style: { backgroundColor: "blue", textColor: "black" } },
  { option: "Tommy", style: { backgroundColor: "yellow", textColor: "black" } },
  {
    option: "Kawalpreet",
    style: { backgroundColor: "red", textColor: "black" },
  },
  { option: "Stefan", style: { backgroundColor: "pink", textColor: "black" } },
];
export default () => {
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);
  const [wheelData, setWheelData] = useState(...data);

  const handleSpinClick = () => {
    const newPrizeNumber = Math.floor(Math.random() * data.length);
    console.log(newPrizeNumber);
    // const randomItem = data.splice(newPrizeNumber, 1);
    // console.log(randomItem);
    let newOptions = [...data];
    newOptions = newOptions.slice(0, newPrizeNumber);
    newOptions.concat(newOptions.slice(newPrizeNumber + 1, data.length + 1));
    console.log(newOptions);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  return (
    <>
      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={data}
        onStopSpinning={() => {
          setMustSpin(false);
        }}
      />
      <button onClick={handleSpinClick}>SPIN</button>
    </>
  );
};
