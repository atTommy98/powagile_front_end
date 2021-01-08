import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function FormPropsTextFields({ label, defaultValue }) {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="outlined-read-only-input"
          label={label}
          defaultValue={defaultValue}
          InputProps={{
            readOnly: true,
          }}
          variant="outlined"
        />
      </div>
    </form>
  );
}
