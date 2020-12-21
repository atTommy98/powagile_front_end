// Material UI
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";
import EditIcon from "@material-ui/icons/Edit";
import { Input } from "@material-ui/core";
import CheckIcon from "@material-ui/icons/Check";

// FIXME: Edit, and Delete functions not working

export default function ParticipantCard({
  index,
  name = "Sample Name",
  beingEdited = true,
  ToggleBeingEditedFunc,
  DeleteFunc,
  EditNameFunc,
}) {
  return beingEdited ? (
    <Paper key={index} elevation={2}>
      <Input></Input>
      <Button
        variant="contained"
        onclick={(index) => EditNameFunc(index, name)}
      >
        <CheckIcon /> Confirm
      </Button>
    </Paper>
  ) : (
    <Paper key={index} elevation={2}>
      <p>{name}</p>
      <Button
        variant="contained"
        onclick={(index) => ToggleBeingEditedFunc(index)}
      >
        <EditIcon /> Edit
      </Button>
      &nbsp;&nbsp;
      <Button variant="contained" onclick={(index) => DeleteFunc(index)}>
        <DeleteForeverIcon /> Delete
      </Button>
    </Paper>
  );
}
