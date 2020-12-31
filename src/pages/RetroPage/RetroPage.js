// React
import React, { useState } from "react";

// Material UI
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import TextField from "@material-ui/core/TextField";
import { Input } from "@material-ui/core";

// Icons
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

// Customer Components
import FourLsRetro from "./FourLsRetro";

function Retro() {
  const [retro, setRetro] = useState({
    retroType: null,
    retroStarted: null,
    retroEnded: null,
  });

  const retroTypes = {
    fourLs: ["Liked", "Learned", "Lacked", "Longed For"],
    starfishSmall: ["Keep", "More Of", "Less Of / Stop"],
    starfishLarge: [
      "Keep Doing",
      "More Of",
      "Start Doing",
      "Stop Doing",
      "Less Of",
    ],
    startStopContinue: ["Start", "Stop", "Continue"],
    madSadGlad: ["Mad", "Sad", "Glad"],
    oneWord: ["Thoughts"],
    KALM: ["Keep", "Add", "More", "Less"],
  };

  const [fourLsRetroActive, setFourLsRetroActive] = useState(false);
  const [speedCarActive, setSpeedCarActive] = useState(false);

  function startFourLsRetro() {
    setFourLsRetroActive(true);
    setSpeedCarActive(false);
  }
  function startSpeedCarActive() {
    setSpeedCarActive(true);
    setFourLsRetroActive(false);
  }
  return (
    <div className="Retro">
      <h2>Pow!Agile Retrospective Board™</h2>
      <div>
        <h4>4Ls Retrospective</h4>
        <button onClick={startFourLsRetro}>Play 4Ls</button>

        {fourLsRetroActive ? <FourLsRetro /> : null}

        <Grid container spacing={3}>
          <Grid item xs={3}>
            <Paper>
              <h3>Liked</h3>
              <Card className="participantCard">
                <Input
                  disableUnderline
                  multiline
                  rows={2}
                  placeholder="Your card text goes here..."
                />
                <Button>
                  <DeleteForeverIcon size="large" />
                </Button>

                <ButtonGroup
                  fullWidth
                  variant="text"
                  size="small"
                  color="black"
                >
                  <Button>
                    <ChevronLeftIcon />
                  </Button>
                  <Button>
                    <ThumbDownIcon />
                  </Button>
                  <Button>
                    <ThumbUpIcon />
                  </Button>
                  <Button>
                    <ChevronRightIcon />
                  </Button>
                </ButtonGroup>
              </Card>
              <Button style={{ width: "100%" }}>+</Button>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper>
              <h3>Learned</h3>
              <Button style={{ width: "100%" }}>+</Button>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper>
              <h3>Lacked</h3>
              <Button style={{ width: "100%" }}>+</Button>
            </Paper>
          </Grid>
          <Grid item xs={3}>
            <Paper>
              <h3>Longed For</h3>
              <Button style={{ width: "100%" }}>+</Button>
            </Paper>
          </Grid>
        </Grid>
      </div>

      {/* <div>
        <h4>Speed Car</h4>
        <button onClick={startSpeedCarActive}>Play SpeedCar</button>
        {speedCarActive ? <SpeedCar /> : null}
      </div> */}
    </div>
  );
}

export default Retro;
