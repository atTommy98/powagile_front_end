// Material UI
import Fab from "@material-ui/core/Fab";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import Collapse from "@material-ui/core/Collapse";

// Icons
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";

// Parrots
import SlowParrot from "../Parrots/hd/slowparrot.gif";
import FastParrot from "../Parrots/hd/fastparrot.gif";

// CSS
import "./TimerPartyParrot.css";

export default function TimerPartyParrot({ props, helperText }) {
  const {
    array,
    activeStage,
    setActiveStage,
    activeParticipants,
    speakerTime,
  } = props;

  return (
    <Collapse in={activeStage.timerStage} timeout={1500}>
      <Paper className="randomizerCard" elevation={2}>
        <div className="circularTimerWrapper">
          <img
            className="partyParrot"
            src={activeParticipants[0].timeLeft >= 15 ? SlowParrot : FastParrot}
            alt={
              activeParticipants[0].timeLeft >= 15
                ? "Party parrot moving slowly"
                : "Party parrot moving very quickly"
            }
          ></img>

          <CircularProgress
            className="circularTimer"
            variant="determinate"
            color={
              activeParticipants[0].timeLeft >= 0 ? "primary" : "secondary"
            }
            value={(100 / speakerTime) * activeParticipants[0].timeLeft}
            size={175}
            thickness={1.75}
          />
          <p className="textTimer">
            {array[0].timeLeft > 0
              ? new Date(array[0].timeLeft * 1000).toISOString().substr(14, 5)
              : "00:00"}
          </p>
        </div>
        <br />

        <div className="supportingComponents">{helperText}</div>

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
      </Paper>
    </Collapse>
  );
}
