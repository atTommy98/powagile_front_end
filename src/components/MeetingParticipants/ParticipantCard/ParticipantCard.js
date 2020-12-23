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
  DeleteFunc,
}) {
  const [animationToggle, setAnimationToggle] = useState(true);
  const timeoutDuration = 250;

  return (
    <Grow
      in={animationToggle}
      {...(animationToggle ? { timeout: timeoutDuration } : {})}
    >
      <Paper key={index} elevation={2} className="participantCard">
        <div>
          <p className="name">
            <PersonIcon />
            &nbsp;
            {name}
          </p>
          <div className="buttons">
            {/* <Button
            variant="contained"
            onClick={(index) => ToggleBeingEditedFunc(index)}
          >
            <EditIcon /> Edit
          </Button> */}
            &nbsp;&nbsp;
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
