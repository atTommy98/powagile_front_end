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
  DeleteFunc = null,
}) {
  const [animationToggle, setAnimationToggle] = useState(true);
  const timeoutDuration = 300;

  // FIXME: I wanna understand why the F this doesn't work?????
  // function deleteWithTransition() {
  //   setAnimationToggle(false);
  //   setTimeout(() => DeleteFunc(index), timeoutDuration);
  // }

  return (
    <Grow
      key={index}
      in={animationToggle}
      {...(animationToggle ? { timeout: timeoutDuration } : {})}
    >
      <Paper elevation={2} className="participantCard">
        <div>
          <p className="name">
            <PersonIcon />
            &nbsp;
            {name}
          </p>
          <div className="buttons">
            <Button
              variant="contained"
              onClick={() => {
                DeleteFunc(index);
              }}
            >
              <DeleteForeverIcon /> Delete
            </Button>
          </div>
        </div>
      </Paper>
    </Grow>
  );
}
