// Material UI
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import InputAdornment from "@material-ui/core/InputAdornment";
import TimelapseIcon from "@material-ui/icons/Timelapse";
import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";

// CSS
import "./02_Setup.css";

// Custom Componenets
import ParticipantCard from "../../../components/MeetingParticipants/ParticipantCard/ParticipantCard";

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

  //If we want to display the participants from last meeting
  async function getParticipants() {
    const res = await fetch("http://localhost:8080/meeting/getAll");
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
          timesPaused: [],
        })
      );
    setMeeting({ ...meeting, meetingParticipants: fetchedParticipants });

    console.log(data);
  }
  return (
    //TODO: Inline styles here should be moved to 02_Setup.CSS
    <section className="setupPage">
      <h2 className="pageTitle" style={{ textAlign: "left" }}>
        <span className="companyName">Pow!Agile</span>{" "}
        <span className="productNameStandUp">Stand-Up™</span>
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
              endAdornment: <InputAdornment position="end">min</InputAdornment>,
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
            <br></br>
            <br></br>
            <Button
              variant="contained"
              color="primary"
              size="large"
              style={{ margin: "5px 20px" }}
              onClick={getParticipants}
            >
              Get participants
            </Button>
            {meeting.meetingParticipants
              ? meeting.meetingParticipants.map((obj, i) => (
                  <ParticipantCard
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
