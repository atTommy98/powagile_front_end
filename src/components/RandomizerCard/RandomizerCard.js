// Material UI
import LinearProgress from "@material-ui/core/LinearProgress";

import Fade from "@material-ui/core/Fade";
import Paper from "@material-ui/core/Paper";

export default function RandomizerCard({ props }) {
  const { activeParticipants, timeBetweenSpeakers, activeStage } = props;

  return (
    <Paper className="randomizerCard" elevation={2}>
      <Fade in={true} timeout={1000} style={{ transitionDelay: "100ms" }}>
        <p>
          Up next...{" "}
          <Fade in={true} timeout={1000} style={{ transitionDelay: "1000ms" }}>
            <span className="upNextName">{activeParticipants[0].name}!</span>
          </Fade>
        </p>
      </Fade>

      <Fade in timeout={1500} style={{ transitionDelay: "1500ms" }}>
        <LinearProgress
          variant="buffer"
          value={100 - (100 / timeBetweenSpeakers) * activeStage.randomizerTime}
          valueBuffer={0}
        />
      </Fade>

      <Fade in timeout={1500} style={{ transitionDelay: "1500ms" }}>
        <p className="getReadyText">
          {activeStage.randomizerStage
            ? "Get Ready... " + (Math.floor(activeStage.randomizerTime) + 1)
            : "Go!"}
        </p>
      </Fade>
    </Paper>
  );
}
