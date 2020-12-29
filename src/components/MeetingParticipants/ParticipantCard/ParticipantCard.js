// React
import { useState } from "react";

// Material UI
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import PersonIcon from "@material-ui/icons/Person";

// Material UI Transitions
import Grow from "@material-ui/core/Grow";

// CSS
import "./ParticipantCard.css";

export default function ParticipantCard({
  index,
  name = "Sample Name",
  deleteParticipant = null,
}) {
  const [animationToggle, setAnimationToggle] = useState(true);
  const [duration, setDuration] = useState(350);

  function deleteWithTransition() {
    // I don't understand exactly why my code here works
    // You can thank React's weird .map rendering 👌
    const origDur = duration;
    setAnimationToggle(false);
    setTimeout(() => deleteParticipant(index), duration);
    setTimeout(() => {
      setDuration(1);
      setAnimationToggle(true);
      setDuration(origDur);
    }, duration + 0.01);
  }

  return (
    <Grow
      key={index}
      in={animationToggle}
      {...(animationToggle ? { timeout: duration } : {})}
    >
      <Paper elevation={1} className="participantCard">
        <div>
          <p className="name">
            <PersonIcon />
            &nbsp;
            {name}
          </p>
          <div className="buttons">
            <Button
              disableElevation
              size="small"
              variant="contained"
              onClick={deleteWithTransition}
            >
              <DeleteForeverIcon /> Delete
            </Button>
          </div>
        </div>
      </Paper>
    </Grow>
  );
}
