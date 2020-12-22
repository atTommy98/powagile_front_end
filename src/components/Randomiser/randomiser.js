import React, { useState } from "react";

const name = ["Daniela", "Stefan", "Jon", "Kawalpreet", "Tommy"];

function Randomiser() {
  const [choosenName, setChoosenName] = useState("");

  function selectRandomOption() {
    const randomName = Math.floor(Math.random() * name.length);
    if (name.length !== 0) {
      setChoosenName(name.splice(randomName, 1)[0]);
    } else {
      setChoosenName("No more Players");
    }
  }

  return (
    <div className="randomiser">
      <button id="selectRandomOption" onClick={selectRandomOption}>
        Select Player
      </button>
      <h3>{choosenName}</h3>
    </div>
  );
}

export default Randomiser;
