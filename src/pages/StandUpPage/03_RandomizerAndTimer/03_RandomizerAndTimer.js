import React, { useState, useEffect } from "react";

// Material UI
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import IconButton from "@material-ui/core/IconButton";
// Icons
import PauseIcon from "@material-ui/icons/Pause";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

// Parrots
import SlowParrot from "../../../components/Parrots/hd/slowparrot.gif";
import FastParrot from "../../../components/Parrots/hd/fastparrot.gif";

// CSS
import "./03_RandomizerAndTimer.css";

// Custom components
import RandomizerCard from "../../../components/RandomizerCard/RandomizerCard";

export default function RandomizerAndTimer({ props }) {
  const {
    meeting,
    setMeeting,
    array,
    speakerTime,
    timeBetweenSpeakers,
  } = props;

  const [activeParticipants, setActiveParticipants] = useState([...array]);
  const [activeStage, setActiveStage] = useState({
    randomizerStage: true,
    randomizerTime: timeBetweenSpeakers,
    timerStage: false,
    timerActive: false,
  });

  useEffect(() => {
    // Randomizer
    if (
      activeStage.randomizerStage === true &&
      activeStage.randomizerTime > 0
    ) {
      progressBarTimeBetweenParticipants();
    }
    if (
      activeStage.randomizerStage === true &&
      activeStage.randomizerTime === 0
    ) {
      setActiveStage({
        ...activeStage,
        randomizerStage: false,
        randomizerTime: timeBetweenSpeakers,
        timerStage: true,
        timerActive: true,
      });
    }
  }, [activeStage]);

  useEffect(() => {
    // Circular Timer
    if (activeStage.timerStage === true && activeStage.timerActive === true) {
      setTimeout(circularTimerCountDown, 1000);
    }
  }, [activeStage, activeParticipants]);

  function progressBarTimeBetweenParticipants() {
    setTimeout(function () {
      let newTime = Number((activeStage.randomizerTime - 0.1).toFixed(2));

      setActiveStage({
        ...activeStage,
        randomizerTime: newTime,
      });
    }, 100);
  }

  function circularTimerCountDown() {
    let newState = [...array];
    newState[0].timeLeft -= 1;
    setActiveParticipants([...newState]);
    return;
  }

  return (
    <Grid container spacing={1}>
      <Grid item xs={4}>
        <Paper className="participantsTracker" elevation={2}>
          <h3>Meeting tracker</h3>
          <List dense={true}>
            {array.map((el) => (
              <ListItem>
                <ListItemText primary={el.name} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete">
                    {el.hasHadTurn ? <CheckCircleIcon color="primary" /> : null}
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Grid>

      <Grid item xs={8}>
        <RandomizerCard
          props={{ activeParticipants, timeBetweenSpeakers, activeStage }}
        />

        <Paper className="randomizerCard" elevation={2}>
          <div className="circularTimerWrapper">
            <img
              className="partyParrot"
              src={
                activeParticipants[0].timeLeft >= 15 ? SlowParrot : FastParrot
              }
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
      </Grid>
    </Grid>
  );
}
