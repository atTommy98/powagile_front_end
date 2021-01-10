// Material UI
import Grid from "@material-ui/core/Grid";

// Custom componenets
import RetroColumn from "./RetroColumn/RetroColumn";

// Socket.io Client
import { io } from "socket.io-client";

export default function MeetingInProgress({ props }) {
  const {
    meeting,
    setMeeting,
    addCard,
    updateCardText,
    updateCardVotes,
    deleteCard,
    moveCard,
  } = props;

  // const [socket, setSocket] = useState(null);

  // useEffect(() => {
  //   if (!socket) {
  //     // connect the socket
  //     setSocket(io("http://localhost:8080"));
  //   }
  //   // try an emit
  // });

  return (
    <div>
      {/*Some sexy logic here where it picks up the time from the meeting*/}
      {/* <TimerPartyParrotHorizontal
          props={{
            totalTime: 600,
            timeLeft: 600,
          }}
        /> */}
      <div>
        <Grid
          className="retroBoardContainer"
          container
          spacing={2}
          wrap="nowrap"
        >
          {meeting.columns.map((columnTitle, index) => (
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
                  card.columnIndex === index ? true : false
                ),
              }}
            ></RetroColumn>
          ))}
        </Grid>
      </div>
    </div>
  );
}
