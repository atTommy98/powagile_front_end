import React, { useState } from "react";

export default function Randomiser({ array }) {
  const [choosenName, setChoosenName] = useState("");

  function selectRandomOption() {
    const randomName = Math.floor(Math.random() * array.length);

    console.log(array);
    if (array.length !== 0) {
      const displayName = array.splice(randomName, 1);
      console.log(displayName.name);
      console.log(displayName.name);
      setChoosenName(displayName.name);
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
