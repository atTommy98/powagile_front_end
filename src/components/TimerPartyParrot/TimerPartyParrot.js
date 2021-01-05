// Material UI
import Fab from "@material-ui/core/Fab";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import Collapse from "@material-ui/core/Collapse";
import Button from "@material-ui/core/Button";

// Icons
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

// Parrots
import SlowParrot from "../Parrots/hd/slowparrot.gif";
import FastParrot from "../Parrots/hd/fastparrot.gif";

// CSS
import "./TimerPartyParrot.css";

export default function TimerPartyParrot({ props, children }) {
  const {
    activeStage,
    setActiveStage,
    meeting,
    setMeeting,
    speakerTime,
  } = props;

  const meetingParticipants = meeting.meetingParticipants;

  function timerThirds() {
    const oneThird = speakerTime / 3;
    const timeLeft = meetingParticipants[0].timeLeft;

    if (timeLeft >= oneThird * 2) {
      return 1;
    }
    if (timeLeft <= oneThird * 2 && timeLeft >= oneThird) {
      return 2;
    }
    if (timeLeft <= oneThird && timeLeft > 0) {
      return 3;
    }
  }

  function nextParticipant() {
    setActiveStage({
      randomizerStage: true,
      timerStage: false,
      timerActive: false,
    });

    const newParticipants = [...meeting.meetingParticipants];
    const previousParticipant = newParticipants.shift();
    previousParticipant.hasHadTurn = true;
    newParticipants.push(previousParticipant);
    setMeeting({ ...meeting, meetingParticipants: newParticipants });
  }

  return (
    <Collapse in={activeStage.timerStage} timeout={1500}>
      <Paper className="randomizerCard" elevation={2}>
        <div className="circularTimerWrapper">
          <img
            className="partyParrot"
            src={
              meetingParticipants[0].timeLeft >= 15 ? SlowParrot : FastParrot
            }
            alt={
              meetingParticipants[0].timeLeft >= 15
                ? "Party parrot moving slowly"
                : "Party parrot moving very quickly"
            }
          ></img>

          <CircularProgress
            className="circularTimer"
            variant="determinate"
            color={
              meetingParticipants[0].timeLeft >= 0 ? "primary" : "secondary"
            }
            value={(100 / speakerTime) * meetingParticipants[0].timeLeft}
            size={175}
            thickness={1.75}
          />
          <p className="textTimer">
            {meetingParticipants[0].timeLeft > 0
              ? new Date(meetingParticipants[0].timeLeft * 1000)
                  .toISOString()
                  .substr(14, 5)
              : "00:00"}
          </p>
        </div>

        <div className="standUpCardsWrapper">
          <Paper
            className={
              timerThirds() === 1 ? "activeCard standUpCard" : "standUpCard"
            }
            elevation={0}
          >
            <div className="centerVertically">
              <p className="helperCardTitle">Accomplishments</p>
              <p>What did you achieve yesterday?</p>
            </div>
          </Paper>
          <Paper
            className={
              timerThirds() === 2 ? "activeCard standUpCard" : "standUpCard"
            }
            elevation={0}
          >
            <div className="centerVertically">
              <p className="helperCardTitle">Goals</p>
              <p>What are you doing today?</p>
            </div>
          </Paper>
          <Paper
            className={
              timerThirds() === 3 ? "activeCard standUpCard" : "standUpCard"
            }
            elevation={0}
          >
            <div className="centerVertically">
              <p className="helperCardTitle">Blockers</p>
              <p>Any blockers in your way?</p>
            </div>
          </Paper>
        </div>

        <div className="supportingComponents">{children}</div>

        {activeStage.timerActive === true ? (
          <Fab
            color="secondary"
            onClick={() =>
              setActiveStage({ ...activeStage, timerActive: false })
            }
          >
            <PauseIcon />
          </Fab>
        ) : (
          <Fab
            disabled={!activeStage.timerStage}
            color="primary"
            onClick={() =>
              setActiveStage({ ...activeStage, timerActive: true })
            }
          >
            <PlayArrowIcon />
          </Fab>
        )}
        <br />
        <br />
        {"if the meeting has been finished, replace the button below"}
        <br />
        <Button onClick={nextParticipant}>Next Participant &rarr;</Button>
      </Paper>
    </Collapse>
  );
}
