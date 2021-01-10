// Material UI
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";

// CSS
import "./RetroColumn.css";

// Custom Components
import RetroCard from "../RetroCard/RetroCard";

// shortid
import { nanoid } from "nanoid";

export default function RetroColumn({ props = {} }) {
  const {
    meeting,
    setMeeting,
    columnTitle = "Column Title",
    index,
    cards,
    addCard,
    updateCardText,
    updateCardVotes,
    deleteCard,
    moveCard,
    participant,
  } = props;

  return (
    <Grid item key={"column" + index}>
      <Collapse in>
        <Paper className="columnWrapper">
          <h3 className="columnTitle">{columnTitle}</h3>
          {cards.length > 0 ? (
            cards
              .sort(
                (card1, card2) =>
                  card2.thumbsUp -
                  card2.thumbsDown -
                  (card1.thumbsUp - card1.thumbsDown)
              )
              .map((card, index) => (
                <RetroCard
                  key={`${columnTitle}_${card}_${index}`}
                  props={{ card, index, meeting, participant }}
                  functions={{
                    updateCardText,
                    updateCardVotes,
                    deleteCard,
                    moveCard,
                  }}
                />
              ))
          ) : (
            <p className="columnHelperText">This column has no cards</p>
          )}
          <Button
            style={{ width: "100%" }}
            onClick={() => addCard({ source: "local", card: { i: index } })}
          >
            Add Card +
          </Button>
        </Paper>
      </Collapse>
    </Grid>
  );
}
