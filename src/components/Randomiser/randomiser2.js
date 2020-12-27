import { useState, useEffect } from "react";

// Material UI
import Fab from "@material-ui/core/Fab";
import LinearProgress from "@material-ui/core/LinearProgress";
import CircularProgress from "@material-ui/core/CircularProgress";
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import { Grow } from "@material-ui/core";

export default function Randomiser({ props }) {
  const { setMeeting, array, timeInSeconds, timeBetweenSpeakers } = props;

  const [activeParticipants, setActiveParticipants] = useState([...array]);
  const [activeStage, setActiveStage] = useState({
    shuffleStage: true,
    shuffleActive: false,
    timerStage: false,
    timerActive: false,
  });

  function shuffleParticipants() {
    /*rewrite this shit */
  }

  useEffect(() => {
    if (activeStage.shuffleStage === true) {
      shuffleParticipants();
    }
    if (activeStage.timerStage === true) {
      /*call some other function idk*/
    }
  });

  return (
    <div>
      <p>It's now the turn of...</p>
      <Grow in>
        <p className="selectedName">{activeParticipants[0].name}</p>
      </Grow>
      <LinearProgress variant="buffer" value={10} valueBuffer={20} />

      <section style={{ textAlign: "center" }}>
        <CircularProgress
          variant="determinate"
          value={timeInSeconds / timeInSeconds - 1}
          size={100}
          thickness={2.5}
        />
        <p>{new Date(timeInSeconds * 1000).toISOString().substr(14, 5)}</p>
        <br />
        <br />
        {/*Some shit here to track paused/playing state idk*/}
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
            color="primary"
            onClick={() =>
              setActiveStage({ ...activeStage, timerActive: true })
            }
          >
            <PlayArrowIcon />
          </Fab>
        )}
      </section>
    </div>
  );
}
