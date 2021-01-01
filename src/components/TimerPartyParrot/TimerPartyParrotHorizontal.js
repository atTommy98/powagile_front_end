// Material UI
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import Collapse from "@material-ui/core/Collapse";

// Parrots
import SlowParrot from "../Parrots/hd/slowparrot.gif";
import FastParrot from "../Parrots/hd/fastparrot.gif";

// CSS
import "./TimerPartyParrot.css";

export default function TimerPartyParrotHorizontal({ props, helperText }) {
  const { totalTime, timeLeft } = props;

  return (
    <Collapse in timeout={1500}>
      <Paper className="randomizerCard horizontal" elevation={2}>
        <div className="circularTimerWrapper">
          <img
            className="partyParrot"
            src={timeLeft >= 15 ? SlowParrot : FastParrot}
            alt={
              timeLeft >= 15
                ? "Party parrot moving slowly"
                : "Party parrot moving very quickly"
            }
          ></img>

          <CircularProgress
            className="circularTimer"
            variant="determinate"
            color="primary"
            value={(100 / totalTime) * timeLeft}
            size={175}
            thickness={1.75}
          />
          <p className="textTimer">
            {timeLeft > 0
              ? new Date(timeLeft * 1000).toISOString().substr(14, 5)
              : "00:00"}
          </p>
        </div>
        <br />

        <div className="supportingComponents">{helperText}</div>
      </Paper>
    </Collapse>
  );
}
