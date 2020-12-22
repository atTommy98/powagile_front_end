// Material UI
import Button from "@material-ui/core/Button";

import React, { useState, useEffect } from "react";

export default function Randomiser({ array }) {
  const [choosenName, setChoosenName] = useState("");

  function selectRandomOption() {
    const randomName = Math.floor(Math.random() * array.length);

    console.log(array);
    if (array.length !== 0) {
      const displayName = array.splice(randomName, 1)[0];
      setChoosenName(displayName.name);
    } else {
      setChoosenName("No more Players");
    }
  }

  useEffect(() => {
    selectRandomOption();
  }, []);

  return (
    <div className="randomiser">
      <Button id="selectRandomOption" onClick={selectRandomOption}>
        Select Player
      </Button>
      <h3>It is now {choosenName}'s turn!</h3>
    </div>
  );
}
