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
import ParticipantCard from "../../components/MeetingParticipants/ParticipantCard/ParticipantCard";
import Randomiser from "../../components/Randomiser/randomiser.js";

export default function StandUpPage() {
  /*Steps*/
  const [standUpStep, setStandUpStep] = useState(1);

  /*Meeting Setup*/
  const [minutesPerParticipant, setMinutesPerParticipant] = useState(2);
  const [timeBetweenSpeakers, setTimeBetweenSpeakers] = useState(15);
  const [participants, setParticipants] = useState({
    participantBeingEntered: "",
    listOfParticipants: [],
  });

  /*Steps*/
  const [totalMeetingTime, setTotalMeetingTime] = useState(0);

  const [meetingActive, setMeetingActive] = useState(false);

  function DeleteFunc(i) {
    console.log(i);

    // Don't delete if no index
    if (i === undefined) {
      console.log("No index passed to DeleteFunc");
      return;
    }
    // New state
    const newState = { ...participants };

    console.log(i.target);

    // Delete participant
    newState.listOfParticipants.splice(i, 1);

    // Set new state
    setParticipants(newState);
  }

  useEffect(() => {
    calculateMeetingTime();
  });

  function calculateMeetingTime() {
    // How manu people?
    const people = participants.listOfParticipants.length;
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

  function addParticipant(event) {
    event.preventDefault();
    // Don't add if field is empty
    if (participants.participantBeingEntered === "") {
      return;
    }
    // New state
    const newState = { ...participants };
    // Add paticipant to list
    newState.listOfParticipants.push({
      name: participants.participantBeingEntered,
      beingEdited: false,
    });
    // Set input field to blank
    newState.participantBeingEntered = "";
    // Set new state
    setParticipants(newState);
  }

  function inputFieldParticipantChange(event) {
    setParticipants({
      ...participants,
      participantBeingEntered: event.target.value,
    });
  }
  function startStandUp() {
    setMeetingActive(true);
  }
  return (
    <div>
      <section className="getStartedPage">
        <h2 className="pageTitle" style={{ textAlign: "center" }}>
          <span className="companyName">Pow!Agile</span>{" "}
          <span className="productName">StandUp™</span>
        </h2>
        <p className="stepsTitleText">
          Tired of unproductive stand-ups that drag on for ages?
          <br />
          With StandUp™, you'll be done in no time at all! It's easy:
        </p>
        <div className="stepsWrapper">
          <div className="stepContainer">
            <span className="stepNumber">1</span>
            <p className="stepText">Enter your meeting participants</p>
          </div>
          <div className="stepContainer">
            <span className="stepNumber">2</span>
            <p className="stepText">Set your desired timing per person</p>
          </div>
          <div className="stepContainer">
            <span className="stepNumber">3</span>
            <p className="stepText">Enjoy a quick, producitve meeting!</p>
          </div>
        </div>

        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => setStandUpStep(2)}
        >
          Get Started &rarr;
        </Button>
        <br />
        <br />
        <Button color="secondary" size="medium">
          &larr; Back
        </Button>
      </section>
      <section className="setupPage">
        <h2 className="pageTitle" style={{ textAlign: "left" }}>
          <span className="companyName">Pow!Agile</span>{" "}
          <span className="productName">StandUp™</span>
        </h2>
        <div className="meetingTimeSettingsWrapper">
          <Paper
            elevation={3}
            style={{ maxWidth: "700px", padding: "5px", margin: "10px auto" }}
          >
            <h3>Timing</h3>
            <TextField
              type="number"
              variant="filled"
              label="Minutes per participant"
              defaultValue={minutesPerParticipant}
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
              variant="filled"
              label="Time between speakers"
              defaultValue={timeBetweenSpeakers}
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
            <h3>Meeting Participants</h3>
            <TextField
              label="Participant name"
              helperText="Enter one participant at a time"
              variant="filled"
              value={participants.participantBeingEntered}
              onChange={inputFieldParticipantChange}
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

            {participants.listOfParticipants
              ? participants.listOfParticipants.map((obj, i) => (
                  <ParticipantCard
                    index={i}
                    name={obj.name}
                    DeleteFunc={DeleteFunc}
                  />
                ))
              : null}
          </Paper>
        </form>

        {totalMeetingTime !== 0 ? (
          <p className="totalStandupTime">
            With this setup, you'll be done in about{" "}
            <b>{totalMeetingTime} minutes.</b> Ready to start?
          </p>
        ) : null}

        {totalMeetingTime !== 0 ? (
          <div>
            <Button
              size="large"
              color="primary"
              variant="contained"
              onClick={startStandUp}
            >
              Start StandUp™ &rarr;
            </Button>
            <br />
            <br />
            <Button size="medium" color="secondary">
              &larr; Back
            </Button>
            &nbsp;&nbsp;
          </div>
        ) : null}

        {meetingActive ? (
          <div>
            <Randomiser
              array={participants.listOfParticipants}
              timeInSeconds={minutesPerParticipant * 60}
              timeBetweenSpeakers={timeBetweenSpeakers}
            />
            {/* <Timer timeInSeconds={minutesPerParticipant * 60} /> */}
          </div>
        ) : null}
      </section>
    </div>
  );
}
