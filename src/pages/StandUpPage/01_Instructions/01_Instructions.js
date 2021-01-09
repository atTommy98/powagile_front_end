// Material UI
import Button from "@material-ui/core/Button";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

// Material UI Transitions
import Grow from "@material-ui/core/Grow";

// CSS
import "./01_Instructions.css";

export default function InstructionsPage({
  nextButton = null,
  backButton = null,
}) {
  const standUpInfo = [
    {
      title: `What is a standup?`,
      text: `For software teams, a standup is like the team’s huddle. It’s even
    commonly known as the daily scrum, and reinforces “we” to keep
    everyone aware of the team’s landscape and progress.`,
    },
    {
      title: `How long does a standup last?`,
      text: `Limit the duration of stand-ups to 15 mins–max. Have a smaller
    team? Make it a practice to keep the stand-up even shorter.`,
    },
    {
      title: `What questions are asked during a standup?`,
      text: `The main questions you should cover are:
    What you worked on yesterday?
    What you're working on today?
    What issues are blocking your progress?`,
    },
    {
      title: `How do I keep my standups engaging?`,
      text: `Aim for quick, concise standups where each member answers the three main questions. If follow-up discussions are required (for example, for resolving blockers), schedule these after the standup.`,
    },
    {
      title: `What is the best time to run standups?`,
      text: `Standups are generally run in the morning, before you kick off the workday. Do experiment with timings to see what fits your team best.`,
    },
  ];
  return (
    <section className="getStartedPage">
      <div className="stepsWrapper">
        {standUpInfo.map((el) => (
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

      <p>Ready?</p>
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
