// React
import { useEffect } from "react";

// Material UI
import Button from "@material-ui/core/Button";
import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import IconButton from "@material-ui/core/IconButton";
import FilledInput from "@material-ui/core/FilledInput";
import InputAdornment from "@material-ui/core/InputAdornment";
import FileCopyIcon from "@material-ui/icons/FileCopy";

// Retro Types Icons
import Looks4Icon from "@material-ui/icons/Looks4";
import StarRateIcon from "@material-ui/icons/StarRate";
import StarIcon from "@material-ui/icons/Star";
import TrafficIcon from "@material-ui/icons/Traffic";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import AssignmentIcon from "@material-ui/icons/Assignment";

// Nano id
import { nanoid } from "nanoid";

// Auth0
import { useAuth0 } from "@auth0/auth0-react";

export default function SetupFacilitator({ props }) {
  const {
    previousStep,
    nextStep,
    participant,
    setParticipant,
    meeting,
    setMeeting,
  } = props;

  const { user, isAuthenticated, isLoading } = useAuth0();

  const retroColumns = [
    {
      name: "Four Ls (4Ls)",
      columns: ["Liked", "Learned", "Lacked", "Longed For"],
      icon: <Looks4Icon />,
    },
    {
      name: "Starfish (Small)",
      columns: ["Keep", "More Of", "Less Of / Stop"],
      icon: <StarRateIcon />,
    },
    {
      name: "Starfish (Large)",
      columns: [
        "Keep Doing",
        "More Of",
        "Start Doing",
        "Stop Doing",
        "Less Of",
      ],
      icon: <StarIcon />,
    },
    {
      name: "Start, Stop, Continue",
      columns: ["Start", "Stop", "Continue"],
      icon: <TrafficIcon />,
    },
    {
      name: "Mad, Sad, Glad",
      columns: ["Mad", "Sad", "Glad"],
      icon: <EmojiEmotionsIcon />,
    },
    {
      name: "One Word Retro",
      columns: ["Your Thoughts In One Word"],
      icon: <ChatBubbleIcon />,
    },
    {
      name: "KALM Retro",
      columns: ["Keep", "Add", "More", "Less"],
      icon: <AssignmentIcon />,
    },
  ];

  const styleObj = { width: 700 };

  // Set Meeting Room ID
  useEffect(() => {
    console.log(`The meeting room id is ${meeting.roomId}`);
    if (meeting.roomId === null) {
      setMeeting({ ...meeting, roomId: nanoid() });
    }
    console.log(`The meeting room id is ${meeting.roomId}`);
  });

  // Add avatar URL, if any
  useEffect(() => {
    if (user.picture) {
      setParticipant({ ...participant, avatar: user.picture });
    }
  }, [isLoading]);

  return (
    <div>
      <h2>Facilitate a Retrospective</h2>
      <p>Your name (autofill if logged in)</p>
      <input onChange={(e) => setMeeting({ ...meeting })}></input>
      <p>Meeting room name (optional)</p>
      <input></input>
      <br />
      <br />
      <br />
      <FormControl variant="outlined" style={styleObj}>
        <InputLabel>Pick your retrospective</InputLabel>
        <Select
          value={meeting.subtype}
          onChange={(e) => {
            console.log(e.target.value);
          }}
          label="Pick your retrospective"
        >
          {retroColumns.map((el, i) => (
            <MenuItem value={el}>
              {el.icon}&nbsp;{el.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <p>Your unique link - send this to your participants</p>
      <FormControl variant="filled" style={styleObj}>
        <InputLabel htmlFor="generated-meeting-url">
          Meeting Room Link
        </InputLabel>
        <FilledInput
          readOnly
          id="generated-meeting-url"
          value={`http://localhost:3000/rituals/retro?roomId=${meeting.roomId}`}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                disableRipple
                disableFocusRipple
                aria-label="copy link"
                onClick={() => console.log("Copy link")}
                edge="end"
              >
                <Button>
                  Copy &nbsp; <FileCopyIcon />
                </Button>
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <p>or</p>
      <FormControl variant="filled" style={styleObj}>
        <InputLabel htmlFor="generated-meeting-id">Room ID</InputLabel>
        <FilledInput
          readOnly
          id="generated-meeting-id"
          value={meeting.roomId}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                disableRipple
                disableFocusRipple
                aria-label="copy link"
                onClick={() => console.log("Copy link")}
                edge="end"
              >
                <Button>
                  Copy &nbsp; <FileCopyIcon />
                </Button>
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <br />
      <br />
      <br />
      <br />
      <button onClick={previousStep}>&larr; Back</button>
      <button onClick={nextStep}>Start session &rarr;</button>
    </div>
  );
}
