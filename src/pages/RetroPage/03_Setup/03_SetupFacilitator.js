// Material UI
import Button from "@material-ui/core/Button";

// Retro Types Icons
import Looks4Icon from "@material-ui/icons/Looks4";
import StarRateIcon from "@material-ui/icons/StarRate";
import StarIcon from "@material-ui/icons/Star";
import TrafficIcon from "@material-ui/icons/Traffic";
import EmojiEmotionsIcon from "@material-ui/icons/EmojiEmotions";
import ChatBubbleIcon from "@material-ui/icons/ChatBubble";
import AssignmentIcon from "@material-ui/icons/Assignment";

export default function SetupFacilitator({ props }) {
  const { setRetroType = null } = props;

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

  return (
    <div>
      <input>Your name (autofill if logged in)</input>
      <input>Meeting room name (optional)</input>
      <select>Retro type</select>
      <div>
        {retroColumns.map((el) => (
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={el.icon}
            onClick={() => setRetroType(el)}
          >
            {el.name}
          </Button>
        ))}
      </div>
      <input>Your unique link - send this to your participants</input>
      <br />
      <button>&larr; Back</button>
      <button>Start session &rarr;</button>
    </div>
  );
}
