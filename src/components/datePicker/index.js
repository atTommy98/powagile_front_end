// React
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default function DatePickers() {
  const [dateFilter, setDateFilter] = useState(null);
  const classes = useStyles();
  return (
    <form
      className={classes.container}
      noValidate
      onChange={(event) => setDateFilter(event.target.value)}
    >
      <TextField
        id="date"
        label="Meeting Date"
        type="date"
        defaultValue="2020-05-24"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}
