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
      text: `Identify how to improve teamwork by reflecting on what worked, what didn’t, and why. We recommend running a Retrospective with your team every couple of weeks or at the end of a project milestone.`,
    },
    {
      title: `How to prepare a Retrospective`,
      text: `Start the retrospective by creating a new session. Give it a suggestive title and choose between different types of Retro you would like to run.`,
    },
    {
      title: `Setting the stage`,
      text: `Let your team know the following at the start of the meeting: 
      The reason you’re taking the time to talk about how we have worked is to see how we can make improvements. 
      We’re coming into this meeting understanding that everyone did the best that they could given their knowledge and tools. 
      This meeting is a safe space. Nothing that is shared will be used against anyone. 
      We’re here to explore, not to blame.`,
    },
    {
      title: `Key moments`,
      text: `Have the team think back over the chosen time period. What were the key events that occured? Provide a few examples, such as goals met, team celebrations, team members joining, company events. 
      Anchoring the team in key milestones jogs the team’s memory of events that occurred and how they felt about them.`,
    },
    {
      title: `What we did well?`,
      text: `Depending on the type pf Retro you will run. explain to the team the meaning of all columns.
      Using our tool, have each team member write down by adding a new card what the team did well, one idea per note. Delete similar or duplicate ideas. Discuss each one briefly as a team.`,
    },
    {
      title: `What we can do better?`,
      text: `Have everyone write down what they think can be improved, one idea per card. Delete similar or duplicate ideas. Discuss each one briefly as a team.`,
    },
    {
      title: `Share your action plan`,
      text: `Have everyone brainstorm actions that can be taken to improve problem areas, one idea per card. Each person will have a few minutes to share their plan. Use the actions list to capture each action. Make sure to include who will do it, what they are doing, and by when.`,
    },
    {
      title: `Wrap up`,
      text: `Commit to when you’ll track progress on actions on a regular basis, such as at team meetings or at the next Retro.`,
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
