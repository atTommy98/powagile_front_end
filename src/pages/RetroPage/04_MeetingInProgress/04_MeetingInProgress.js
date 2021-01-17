// React
import { useState, useEffect } from "react";

// Material UI
import Grid from "@material-ui/core/Grid";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import IconButton from "@material-ui/core/IconButton";
import FilledInput from "@material-ui/core/FilledInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import Paper from "@material-ui/core/Paper";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

// Custom componenets
import RetroColumn from "./RetroColumn/RetroColumn";
import TimerPartyParrotHorizontal from "../../../components/TimerPartyParrot/TimerPartyParrotHorizontal";

// notistack
import { useSnackbar } from "notistack";

// Socket.io Client
import { io } from "socket.io-client";

// CSS
import "./04_MeetingInProgress.css";

// Environment variables
require("dotenv").config();
const { REACT_APP_FRONT_END_URL, REACT_APP_BACK_END_URL } = process.env;

export default function MeetingInProgress({ props }) {
  const {
    meeting,
    setMeeting,
    addCard,
    deleteCard,
    updateCardText,
    updateCardVotes,
    moveCard,
    participant,
    setParticipant,
    socket,
    setSocket,
  } = props;

  // Snackbar notifications
  const { enqueueSnackbar } = useSnackbar();

  // Copy link function
  function copyLink() {
    const uniqueLink = document.getElementById("generated-meeting-url");
    uniqueLink.select();
    uniqueLink.setSelectionRange(0, 99999);
    document.execCommand("copy");

    enqueueSnackbar("Your unique room link has been copied", {
      persist: false,
      variant: "success",
    });
  }

  // Start the meeting
  useEffect(() => {
    if (!meeting.meetingStarted) {
      setMeeting({ ...meeting, meetingStarted: true });
    }
  });

  // Establish socket.io connection and rules (send/receive)
  const [rulesEstablished, setRulesEstablished] = useState(false);
  const [activeParticipants, setActiveParticipants] = useState([]);

  useEffect(() => {
    // Establish socket connection
    if (!socket) {
      // Destructure relevant info for connection
      const { roomId } = meeting;
      const { name, isFacilitator, avatar } = participant;

      setSocket(
        io(`${REACT_APP_BACK_END_URL}`, {
          query: {
            roomId,
            name,
            isFacilitator,
            avatar,
          },
        })
      );
    }

    //// 👉 2 types of sources - local, and socket
    ////// 👉  With socket, we only render, but don't emit the card, to avoid an infinite loop
    ////// 👉  With local, we render AND emit the card, to send it to other participants
    if (socket) {
      if (!rulesEstablished) {
        // 📲 Notification rules
        socket.on("notification", (notification) => {
          const variantKey = {
            user_connected: "info",
            user_disconnected: "warning",
          };

          enqueueSnackbar(notification.content, {
            persist: false,
            variant: variantKey[notification.type],
          });
        });

        //// 📥 "Receive" rules
        socket.on("updateMeeting", (meeting) => {
          setMeeting(meeting);
        });

        socket.on("updateParticipants", (newParticipants) => {
          setActiveParticipants(newParticipants);
        });

        setRulesEstablished(true);
      }
    }

    // Emit initial meeting state
    if (socket && !participant.meetingEmitted) {
      socket.emit("startMeeting", meeting);
      setParticipant({ ...participant, meetingEmitted: true });
    }
  }, [
    addCard,
    deleteCard,
    enqueueSnackbar,
    meeting,
    moveCard,
    participant,
    rulesEstablished,
    setMeeting,
    setParticipant,
    setSocket,
    socket,
    updateCardText,
    updateCardVotes,
  ]);

  return (
    <div>
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} id="meeting-title">
          <Typography variant="h4">{meeting.title}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormControl
            onClick={copyLink}
            variant="filled"
            className="uniqueLinkReadOnlyField"
          >
            <InputLabel htmlFor="generated-meeting-url">
              Your meeting room link - click to copy
            </InputLabel>
            <FilledInput
              readOnly
              id="generated-meeting-url"
              value={`${REACT_APP_FRONT_END_URL}/rituals/retro?roomId=${meeting.roomId}`}
              endAdornment={
                <InputAdornment position="end">
                  <FileCopyIcon />
                </InputAdornment>
              }
            />
          </FormControl>
        </AccordionDetails>
      </Accordion>

      <Grid container spacing={2}>
        <Grid item xs={3}>
          <Paper className="retroParticipantsTracker" elevation={2}>
            <h3>Connected participants</h3>
            <List className="retroParticipantsListContainer" dense={false}>
              {activeParticipants.map((el, i) => (
                <ListItem key={`participant_${el.id}`}>
                  <ListItemText
                    primary={el.name}
                    secondary={i === 0 ? "Facilitator" : "Participant"}
                  />
                  {/* FIXME: */}
                  <ListItemSecondaryAction
                    onClick={() => console.log(`Kicking ${el.id}`)}
                  >
                    {i !== 0 && participant.isFacilitator ? (
                      <IconButton edge="end" aria-label="completed">
                        <ExitToAppIcon color="secondary" />
                      </IconButton>
                    ) : null}
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        <Grid item xs={9}>
          {/* FIXME: No children showing*/}
          <TimerPartyParrotHorizontal
            props={{
              totalTime: 600,
              timeLeft: 260,
            }}
          >
            <p>Finish button will go here....</p>
          </TimerPartyParrotHorizontal>
        </Grid>
      </Grid>

      <div>
        <Grid
          className="retroBoardContainer"
          container
          spacing={2}
          wrap="nowrap"
        >
          {meeting.columns
            ? meeting.columns.map((columnTitle, index) => (
                <RetroColumn
                  key={`${columnTitle}_card${index}`}
                  props={{
                    meeting,
                    setMeeting,
                    columnTitle,
                    index,
                    addCard,
                    updateCardText,
                    updateCardVotes,
                    deleteCard,
                    moveCard,
                    cards: meeting.cards.filter((card) =>
                      card.columnIndex === index && !card.isDeleted
                        ? true
                        : false
                    ),
                    participant,
                  }}
                ></RetroColumn>
              ))
            : null}
        </Grid>
      </div>
    </div>
  );
}
