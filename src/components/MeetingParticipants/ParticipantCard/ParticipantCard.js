// Material UI
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import PersonIcon from "@material-ui/icons/Person";

// FIXME: Delete function not working right

// CSS
import "./ParticipantCard.css";

export default function ParticipantCard({
  index,
  name = "Sample Name",
  DeleteFunc,
}) {
  return (
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
          <Button variant="contained" onClick={() => DeleteFunc(index)}>
            <DeleteForeverIcon /> Delete
          </Button>
        </div>
      </div>
    </Paper>
  );
}
