// React
import { useState } from "react";

// Material UI
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import TimelapseIcon from "@material-ui/icons/Timelapse";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import Collapse from "@material-ui/core/Collapse";

// CSS
import "./02_Setup.css";

// Custom Componenets
import ParticipantCard from "../../../components/MeetingParticipants/ParticipantCard/ParticipantCard";

// Environment variables
require("dotenv").config();
const { REACT_APP_BACK_END_URL } = process.env;

export default function SetupPage({ props }) {
  const {
    minutesPerParticipant,
    setMinutesPerParticipant,
    timeBetweenSpeakers,
    setTimeBetweenSpeakers,
    participantToAdd,
    addParticipant,
    deleteParticipant,
    setParticipantToAdd,
    meeting,
    totalMeetingTime,
    setStandUpStep,
    startMeeting,
    setMeeting,
  } = props;

  const [showFetcher, setShowFetcher] = useState(true);

  // FIXME: Needs to do a query just for the last meeting for that user
  async function getParticipants() {
    const res = await fetch(`${REACT_APP_BACK_END_URL}/meeting/getAll`);
    const data = await res.json();

    const fetchedParticipants = [];
    data
      .slice(-1)
      .pop()
      .meetingParticipants.forEach((participant) =>
        fetchedParticipants.push({
          name: participant.name,
          hasHadTurn: false,
          timeLeft: minutesPerParticipant * 60,
          pauses: [],
        })
      );
    setMeeting({
      ...meeting,
      meetingParticipants: [
        ...meeting.meetingParticipants,
        ...fetchedParticipants,
      ],
    });

    setShowFetcher(false);
  }

  return (
    //TODO: Inline styles here should be moved to 02_Setup.CSS
    <section className="setupPage">
      <div className="meetingTimeSettingsWrapper">
        <Paper
          elevation={3}
          style={{ maxWidth: "700px", padding: "5px", margin: "10px auto" }}
        >
          <h3>Timing</h3>
          <TextField
            type="number"
            variant="outlined"
            label="Minutes per participant"
            defaultValue={minutesPerParticipant}
            error={minutesPerParticipant < 1}
            helperText={
              minutesPerParticipant < 1
                ? "Please give meeting at least 1 minute"
                : minutesPerParticipant > 10
                ? "Aim for a shorter standup, if possible"
                : null
            }
            onChange={(e) => setMinutesPerParticipant(Number(e.target.value))}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <TimelapseIcon />
                </InputAdornment>
              ),
              endAdornment: <InputAdornment position="end">min</InputAdornment>,
            }}
          />
          <TextField
            type="number"
            variant="outlined"
            label="Time between speakers"
            defaultValue={timeBetweenSpeakers}
            error={timeBetweenSpeakers < 5}
            helperText={
              timeBetweenSpeakers < 5 ? "We recommend at least 5 seconds" : null
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PauseCircleOutlineIcon />
                </InputAdornment>
              ),
              endAdornment: <InputAdornment position="end">sec</InputAdornment>,
            }}
            onChange={(e) => setTimeBetweenSpeakers(Number(e.target.value))}
          />
          <br />
          <p style={{ color: "rgba(0,0,0,0.5)" }}>
            We recommend making your meeting no longer than 15 minutes.
          </p>
        </Paper>
      </div>
      <form onSubmit={addParticipant}>
        <Paper
          elevation={3}
          style={{ maxWidth: "700px", padding: "5px", margin: "10px auto" }}
        >
          <h3 style={{ textAlign: "center" }}>Meeting participants</h3>

          <div className="participantCardsList" style={{ margin: "30px" }}>
            {meeting.userId !== null ? (
              <Collapse in={showFetcher}>
                <SnackbarContent
                  className="loadFromPrevious"
                  message="Load participants from your previous meeting?"
                  action={
                    <div>
                      <Button variant="outlined" onClick={getParticipants}>
                        Yes
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => setShowFetcher(false)}
                      >
                        No
                      </Button>
                    </div>
                  }
                />
              </Collapse>
            ) : null}

            <TextField
              className="inputfield"
              label="Participant name"
              variant="outlined"
              value={participantToAdd}
              onChange={(e) => setParticipantToAdd(e.target.value)}
              style={{ width: "calc(100% - 100px)" }}
            />

            <Button
              className="addButton"
              type="submit"
              size="large"
              variant="contained"
              color="primary"
              style={{ margin: "5px 10px" }}
            >
              Add
            </Button>

            {meeting.meetingParticipants
              ? meeting.meetingParticipants.map((obj, i) => (
                  <ParticipantCard
                    key={i}
                    index={i}
                    name={obj.name}
                    deleteParticipant={deleteParticipant}
                  />
                ))
              : null}
          </div>
        </Paper>
      </form>

      {totalMeetingTime <= 0 ? null : totalMeetingTime <= 15 ? (
        <p className="totalStandupTime">
          You'll be done in about <b>{totalMeetingTime} minutes.</b>
          <br />
          Ready to start?
        </p>
      ) : totalMeetingTime > 15 ? (
        <p className="totalStandupTime">
          You'll be done in about <b>{totalMeetingTime} minutes.</b>
          <br />
          Try aiming for a shorter time, if you can.
        </p>
      ) : null}

      <center>
        <Button
          size="medium"
          color="secondary"
          onClick={() => setStandUpStep(1)}
        >
          &larr; Back
        </Button>
        &nbsp;&nbsp;&nbsp;
        <Button
          size="large"
          color="primary"
          variant="contained"
          disabled={
            minutesPerParticipant < 1 ||
            timeBetweenSpeakers < 1 ||
            totalMeetingTime <= 0
          }
          onClick={startMeeting}
        >
          Start Stand-Up™ &rarr;
        </Button>
        &nbsp;&nbsp;
      </center>
    </section>
  );
}
