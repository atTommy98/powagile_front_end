// React
import { useState, useEffect } from "react";

// Material UI
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import React from "react";
import InputAdornment from "@material-ui/core/InputAdornment";
import TimelapseIcon from "@material-ui/icons/Timelapse";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";

// CSS
import "./StandUpPage.css";

// Custom Componenets
import InstructionsPage from "./01_Instructions/01_Instructions";
import ParticipantCard from "../../components/MeetingParticipants/ParticipantCard/ParticipantCard";
import Randomiser from "../../components/Randomiser/randomiser.js";

export default function StandUpPage() {
  /*Steps*/
  const [standUpStep, setStandUpStep] = useState(1);

  /*Meeting Setup*/
  const [minutesPerParticipant, setMinutesPerParticipant] = useState(2);
  const [timeBetweenSpeakers, setTimeBetweenSpeakers] = useState(15);

  const [participantToAdd, setParticipantToAdd] = useState("");

  const [meeting, setMeeting] = useState({
    meetingParticipants: [],
  });

  /*Steps*/
  const [totalMeetingTime, setTotalMeetingTime] = useState(0);

  function DeleteFunc(i) {
    // Don't delete if no index
    if (i === undefined) {
      console.error("No index passed to DeleteFunc");
      return;
    }
    // New state
    const newState = { ...meeting };
    // Delete participant
    newState.meetingParticipants.splice(i, 1);
    // Set new state
    setMeeting(newState);
  }

  function calculateMeetingTime() {
    // How manu people?
    const people = meeting.meetingParticipants.length;
    // How many minutes per person?
    const minutes = minutesPerParticipant;
    // How much time between speakers?
    const bufferTime = timeBetweenSpeakers;

    // Calculate (in seconds)
    const speakingTimeInSeconds = people * minutes * 60;
    const timeBetweenSpeakersInSeconds = people * bufferTime;

    // Sum, and convert to minutes
    const totalTimeInMinutes = Math.round(
      (speakingTimeInSeconds + timeBetweenSpeakersInSeconds) / 60
    );
    setTotalMeetingTime(totalTimeInMinutes);
  }

  useEffect(() => {
    calculateMeetingTime();
  });

  function addParticipant(event) {
    event.preventDefault();
    // Don't add if field is empty
    if (participantToAdd === "") {
      return;
    }
    // New state
    const newState = { ...meeting };
    // Add paticipant to list
    newState.meetingParticipants.push({
      name: participantToAdd,
      hasHadTurn: false,
      timeLeft: null,
    });
    // Set input field to blank
    setParticipantToAdd("");
    // Set new state
    setMeeting(newState);
  }

  function inputFieldParticipantChange(event) {
    setMeeting({
      ...meeting,
      participantBeingEntered: event.target.value,
    });
  }

  return (
    <div>
      {/* TODO: GET RID OF THIS ONCE DONE SPLITTING UP THE STEPS */}
      <h1 style={{ textAlign: "center" }}>STEP {standUpStep}</h1>
      <InstructionsPage nextButton={() => setStandUpStep(2)} />

      <section className="setupPage">
        <h2 className="pageTitle" style={{ textAlign: "left" }}>
          <span className="companyName">Pow!Agile</span>{" "}
          <span className="productName">Stand-Up™</span>
        </h2>
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
                endAdornment: (
                  <InputAdornment position="end">min</InputAdornment>
                ),
              }}
            />
            <TextField
              type="number"
              variant="outlined"
              label="Time between speakers"
              defaultValue={timeBetweenSpeakers}
              error={timeBetweenSpeakers < 10}
              helperText={
                timeBetweenSpeakers < 10
                  ? "We recommend at least 10 seconds"
                  : null
              }
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PauseCircleOutlineIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">sec</InputAdornment>
                ),
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
            <h3>Meeting participants</h3>

            <TextField
              label="Participant name"
              // helperText="Enter one participant at a time"
              variant="outlined"
              value={participantToAdd}
              onChange={(e) => setParticipantToAdd(e.target.value)}
            />

            <Button
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
                    index={i}
                    name={obj.name}
                    DeleteFunc={DeleteFunc}
                  />
                ))
              : null}
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

        <div>
          <Button
            size="large"
            color="primary"
            variant="contained"
            disabled={totalMeetingTime <= 0}
            onClick={() => setStandUpStep(3)}
          >
            Start Stand-Up™ &rarr;
          </Button>
          <br />
          <br />
          <Button
            size="medium"
            color="secondary"
            onClick={() => setStandUpStep(1)}
          >
            &larr; Back
          </Button>
          &nbsp;&nbsp;
        </div>

        {standUpStep === 3 ? (
          <div>
            <Randomiser
              array={meeting.meetingParticipants}
              timeInSeconds={minutesPerParticipant * 60}
              timeBetweenSpeakers={timeBetweenSpeakers}
            />
          </div>
        ) : null}
      </section>
    </div>
  );
}
