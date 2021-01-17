// Material UI
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import React from "react";
import TextField from "@material-ui/core/TextField";

export default function SetupParticipant({ props }) {
  const {
    previousStep,
    nextStep,
    participant,
    setParticipant,
    meeting,
    setMeeting,
  } = props;

  return (
    <section className="retroJoinPage">
      <Paper
        elevation={3}
        style={{ maxWidth: "700px", padding: "5px", margin: "10px auto" }}
      >
        <h3 style={{ textAlign: "center" }}>Join a Retrospective</h3>

        <TextField
          className="inputFieldFacilitator"
          label="Your name"
          required
          variant="outlined"
          value={participant.name}
          onChange={(e) =>
            setParticipant({ ...participant, name: e.target.value })
          }
        />

        <br />
        <br />

        <TextField
          className="inputFieldFacilitator"
          label="Your unique link"
          required
          variant="outlined"
          value={meeting.roomId}
          onChange={(e) => setMeeting({ ...meeting, roomId: e.target.value })}
        />

        <br />
        <br />
      </Paper>

      <center>
        <br />
        <Button color="secondary" onClick={previousStep}>
          &larr; Back
        </Button>
        &nbsp;&nbsp;&nbsp;
        <Button
          color="primary"
          variant="contained"
          onClick={nextStep}
          disabled={!meeting.roomId}
        >
          Join Retrospective™ &rarr;
        </Button>
      </center>
    </section>
  );
}
