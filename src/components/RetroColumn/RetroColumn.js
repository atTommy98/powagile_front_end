// Material UI
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

// CSS
import "./RetroColumn.css";

// Custom Components
import RetroCard from "../RetroCard/RetroCard";

export default function RetroColumn({ props = {} }) {
  const {
    columnTitle = "Column Title",
    index = 0,
    cards,
    addCard = () => {
      return;
    },
  } = props;

  return (
    <Grid item xs={3} key={"column" + index}>
      <Paper className="columnWrapper">
        <h3 className="columnTitle">
          {columnTitle} {index}
        </h3>
        {cards.map((card, index) => (
          <RetroCard key={"card" + card.index} props={card} />
        ))}
        <Button
          style={{ width: "100%" }}
          onClick={() => addCard(index, columnTitle)}
        >
          Add Card +
        </Button>
      </Paper>
    </Grid>
  );
}
