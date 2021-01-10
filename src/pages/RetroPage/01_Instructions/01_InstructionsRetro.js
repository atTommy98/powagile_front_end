// Material UI
import Button from "@material-ui/core/Button";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// CSS
import "./01_InstructionsRetro.css";

export default function InstructionsRetro({ props }) {
  const { nextButton } = props;

  const retroInfo = [
    {
      title: `What is a Retrospective?`,
      text: `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.`,
    },
    {
      title: `What is a Retrospective?`,
      text: `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.`,
    },
    {
      title: `What is a Retrospective?`,
      text: `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.`,
    },
    {
      title: `What is a Retrospective?`,
      text: `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.`,
    },
    {
      title: `What is a Retrospective?`,
      text: `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.`,
    },
    {
      title: `What is a Retrospective?`,
      text: `aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa.`,
    },
  ];
  return (
    <section className="getStartedPage">
      <div className="stepsWrapper">
        {retroInfo.map((el) => (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
            >
              <Typography>{el.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>{el.text}</Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>

      <p>Once you've reviewed the instructions, start your retro:</p>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={nextButton}
      >
        Get Started &rarr;
      </Button>
    </section>
  );
}
