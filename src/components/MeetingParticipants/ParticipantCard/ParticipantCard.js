// Material UI
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import { Input } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";
import PersonIcon from "@material-ui/icons/Person";

// FIXME: Edit, and Delete functions not working

// CSS
import "./ParticipantCard.css";

export default function ParticipantCard({
  index,
  name = "Sample Name",
  beingEdited,
  ToggleBeingEditedFunc,
  DeleteFunc,
  EditNameFunc,
}) {
  return (
    <Paper key={index} elevation={2} className="participantCard">
      {beingEdited ? (
        <div>
          <Input></Input>
          <Button
            variant="contained"
            onClick={(index, name) => EditNameFunc(index, name)}
          >
            <CheckIcon /> Confirm
          </Button>
        </div>
      ) : (
        <div>
          <p className="name">
            <PersonIcon />
            &nbsp;
            {name}
          </p>
          <div className="buttons">
            <Button
              variant="contained"
              onClick={(index) => ToggleBeingEditedFunc(index)}
            >
              <EditIcon /> Edit
            </Button>
            &nbsp;&nbsp;
            <Button variant="contained" onClick={DeleteFunc}>
              <DeleteForeverIcon /> Delete
            </Button>
          </div>
        </div>
      )}
    </Paper>
  );
}
