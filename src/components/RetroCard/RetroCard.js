// Material UI
import Card from "@material-ui/core/Card";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import { Input } from "@material-ui/core";
import Button from "@material-ui/core/Button";

// Icons
import ThumbUpIcon from "@material-ui/icons/ThumbUp";
import ThumbDownIcon from "@material-ui/icons/ThumbDown";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import DeleteForeverIcon from "@material-ui/icons/DeleteForever";

// CSS
import "./RetroCard.css";

export default function RetroCard() {
  return (
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

      <ButtonGroup fullWidth variant="text" size="small" color="black">
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
  );
}
