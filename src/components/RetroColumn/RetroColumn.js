// Material UI
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";

// CSS
import "./RetroColumn.css";

// Custom Components
import RetroCard from "../RetroCard/RetroCard";

export default function RetroColumn({ props = {} }) {
  const {
    meeting,
    setMeeting,
    columnTitle = "Column Title",
    index,
    cards,
    addCard,
    deleteCard,
    moveCard,
  } = props;

  return (
    <Grid item xs={3} key={"column" + index}>
      <Collapse in>
        <Paper className="columnWrapper">
          <h3 className="columnTitle">{columnTitle}</h3>
          {cards.length > 0 ? (
            cards.map((card, index) => (
              <RetroCard
                key={"card" + card.index}
                props={{ card, index, meeting, setMeeting }}
                functions={{ deleteCard, moveCard }}
              />
            ))
          ) : (
            <p className="columnHelperText">Add your first card here...</p>
          )}
          <Button
            style={{ width: "100%" }}
            onClick={() => addCard(index, columnTitle)}
          >
            Add Card +
          </Button>
        </Paper>
      </Collapse>
    </Grid>
  );
}
