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
      text: `A Retrospective is a ceremony held at the end of each iteration in an agile project. The general purpose is to allow the team, as a group, to evaluate its past working cycle. In addition, it’s an important moment to gather feedback on what went well and what did not. Finally, retrospective is a moment for the team to define actions that may fix or improve things identified as negative.`,
    },
    {
      title: `How long does a Retrospective last?`,
      text: `Sprint retrospective should take between 60 to 90 minutes for a two-week sprint and likely a bit longer (however, probably not proportionally longer) when doing longer sprints. 
      Daily Retrospective should last between 10 - 15 minutes depending on the type of retro selected`,
    },
    {
      title: `What questions are asked in a Retrospective?`,
      text: `The three common questions asked are, "What went well? What didnt go so well? What can we improve?" However there are many great retrospective ideas out in the Agile community, including variations and additions on the basic questions and creative facilitation techniques. We have a varied selection for you to choose from`,
    },
    {
      title: `What are the benefits of a Retrospective?`,
      text: `The most important benefit is that it cuts through hierarchy and gives equal power to the team members to open up and present their views effectively.
      Retrospectives provide platform to celebrate success and ponder upon failures. Team members can deliberate upon the course of improvements to be included in the next sprint. Retrospective encourages participation, sharing of interests and views, taking the team towards an amicable solution. End of a retrospective let’s the team to start the next sprint with a clean slate.`,
    },
  ];
  return (
    <section className="getStartedPage">
      <div className="stepsWrapper">
        {retroInfo.map((el, i) => (
          <Accordion key={`RetroInstruction_${i}`}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
            >
              <Typography style={{ fontWeight: "500" }}>{el.title}</Typography>
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
