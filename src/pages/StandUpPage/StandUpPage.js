// React
import { useState } from "react";

// Material UI
import { Input } from "@material-ui/core";
import { DialogTitle } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

// CSS
import "./StandUpPage.css";

export default function StandUpPage() {
  const [minutesPerParticipant, setMinutesPerParticipant] = useState(3);
  const [timeBetweenSpeakers, setTimeBetweenSpeakers] = useState(20);
  const [totalMeetingTime, setTotalMeetingTime] = useState(3);

  const [participants, setParticipants] = useState({
    participantBeingEntered: "",
    listOfParticipants: [],
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
    const totalTimeInMinutes =
      (speakingTimeInSeconds + timeBetweenSpeakersInSeconds) / 60;
    setTotalMeetingTime(totalTimeInMinutes);
    console.log(totalTimeInMinutes);
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
    newState.listOfParticipants.push(participants.participantBeingEntered);
    // Set input field to blank
    newState.listOfParticipants.participantBeingEntered = "";
    // Set new state
    setParticipants(newState);
  }

  function inputFieldParticipantChange(event) {
    setParticipants({
      ...participants,
      participantBeingEntered: event.target.value,
    });
  }

  return (
    <div>
      <div className="participantsSection">
        <DialogTitle>
          <h2>Pow!Agile® StandUp™</h2>
        </DialogTitle>

        <p>Minutes per participant</p>

        <Input
          type="number"
          variant="outlined"
          defaultValue={minutesPerParticipant}
          onChange={setMinutesPerParticipant}
        />
        <br />
        <br />
        <p>Time between speakers (in seconds)</p>
        <Input
          type="number"
          variant="outlined"
          defaultValue={timeBetweenSpeakers}
        />
        <br />
        <br />

        <form onSubmit={addParticipant}>
          <p>Meeting Participants:</p>
          <TextField
            label="Participant name"
            helperText="Enter one participant at a time"
            variant="outlined"
            value={participants.participantBeingEntered}
            onChange={inputFieldParticipantChange}
          />

          <Button type="submit" variant="contained" color="primary">
            Add
          </Button>

          {participants.listOfParticipants
            ? participants.listOfParticipants.map((name) => (
                <Paper>
                  <p>{name}</p>
                  <Button variant="contained">✏ Edit</Button>
                  <Button variant="contained">❌ Delete</Button>
                </Paper>
              ))
            : null}
        </form>

        <p>
          With this setup, you'll be done in about {totalMeetingTime} minutes.
          Ready to start?
        </p>
      </div>
    </div>
  );
}
