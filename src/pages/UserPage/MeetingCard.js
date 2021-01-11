import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import Button from "@material-ui/core/Button";

const useRowStyles = makeStyles({
  root: {
    "& > *": {
      borderBottom: "unset",
    },
  },
});
function createData(name, meetingStartTime, meetingEndTime, meetingFinished) {
  return {
    name,
    meetingStartTime,
    meetingEndTime,
    meetingFinished,
    records: [
      {
        name: String,
        hasHadTurn: Boolean,
        timeLeft: Number,
        timesPaused: Number,
      },
    ],
  };
}
function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.meetingStartTime}</TableCell>
        <TableCell align="right">{row.meetingEndTime}</TableCell>
        <TableCell align="right">{row.meetingFinished}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                Records
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>hasHadTurn</TableCell>
                    <TableCell align="right">timeLeft</TableCell>
                    <TableCell align="right">timesPaused</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {row.records.map((recordsRow) => (
                    <TableRow key={recordsRow.name}>
                      <TableCell component="th" scope="row">
                        {recordsRow.name}
                      </TableCell>
                      <TableCell>{recordsRow.hasHadTurn}</TableCell>
                      <TableCell align="right">{recordsRow.timeLeft}</TableCell>
                      <TableCell align="right">
                        {recordsRow.timesPaused}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    meetingStartTime: PropTypes.number.isRequired,
    meetingEndTime: PropTypes.number.isRequired,
    meetingFinished: PropTypes.bool.isRequired,
    records: PropTypes.arrayOf(
      PropTypes.shape({
        timeLeft: PropTypes.number.isRequired,
        hasHadTurn: PropTypes.bool.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    timesPaused: PropTypes.number.isRequired,
  }).isRequired,
};

const rows = [
  createData("StandUp", 123456, 65431, true),
  createData("Retro", 123456, 65431, false),
];

export default function CollapsibleTable() {
  // state for filtered date
  const [dateFilter, setDateFilter] = useState(null);
  const [isDateFilter, setIsDateFilter] = useState(false);
  const [isCLicked, setIsClicked] = useState(false);

  // state for all previous meetings
  const [meetingHistory, setMeetingHistory] = useState([]);

  // get all meetings filtered by date
  async function getMeetingByDate() {
    let timestamp = new Date(dateFilter);
    timestamp = timestamp.getTime();

    const res = await fetch(
      `http://localhost:8080/meeting/getByDate?meetingStartTime=${timestamp}`
    );
    const { data } = await res.json();
    console.log(data);
    setMeetingHistory(data);
    setIsDateFilter(true);
  }
  return (
    <TableContainer component={Paper}>
      <div className="input-container">
        <h2>Filter your meeting by Date</h2>
        <br></br>
        <span>
          <input
            style={{
              width: "175px",
              align: "center",
              display: "inline-block",
            }}
            className="form-control-homepage"
            type="date"
            onChange={(event) => setDateFilter(event.target.value)}
            placeholder="filter"
            name="filter-date"
          ></input>
        </span>

        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={getMeetingByDate}
        >
          Get all Meetings
        </Button>

        <h2>Showing all meetings since {dateFilter} 📅</h2>
      </div>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Meetings held:</TableCell>
            <TableCell align="right">Start Time</TableCell>
            <TableCell align="right">End Time</TableCell>
            <TableCell align="right">Finished</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {meetingHistory.map((row) => (
            <Row key={row.name} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
