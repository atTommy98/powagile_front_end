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
      text: `Identify how to improve teamwork by reflecting on what worked, what didn’t, and why. We recommend running a Retrospective with your team every couple of weeks or at the end of a project milestone.`,
    },
    {
      title: `Set the stage`,
      text: `Let your team know the following at the start of the meeting: 

      The reason we’re taking the time to talk about how we have worked is to see how we can make improvements. 
      We’re coming into this meeting understanding that everyone did the best that they could given their knowledge and tools. 
      This meeting is a safe space. Nothing that is shared will be used against anyone. 
      We’re here to explore, not to blame.`,
    },
    {
      title: `Key moments`,
      text: `Have the team think back over the chosen time period. What were the key events that occured? Provide a few examples, such as goals met, team celebrations, team members joining, company events. 
      Anchoring the team in key milestones jogs the team’s memory of events that occurred and how they felt about them.
      Then set a timer for 5 minutes for people to add their own key events to the Milestone column.`,
    },
    {
      title: `Reflect`,
      text: `Explain the four lists to the team: "LOVED," "LONGED FOR," "LOATHED" and "LEARNED.”

    LOVED: what you loved about your work over the time period.
    
    This is what you want to keep doing, or do more of, in the future.
    
    LONGED FOR: what you wish you’d had. 
    
    It could be more people, more time, more coffee. Nothing is off the table.
    
    LOATHED: what made life worse back then. 
    
    What do you hope will never happen again?
    
    LEARNED: what you learned from your successes and your mistakes.
    
    Set a timer for 10 minutes for everyone to add their own thoughts to each list.`,
    },
    {
      title: `Decide what to do`,
      text: `Give everyone 10 minutes, as a team or in breakout groups, to discuss:
      - One action you’ll take to remove something from your LOATHED list.
      - One action you’ll take to amplify something from your LOVED list.  
      - Use your LONGED FOR and LEARNED lists to help shape your ideas for what actions to take.`,
    },
    {
      title: `Share your action plan`,
      text: `Each person will have a few minutes to share their plan. Use the actions list to capture each action. Make sure to include who will do it, what they are doing, and by when.`,
    },
    {
      title: `Wrap up`,
      text: `Commit to when you’ll track progress on actions on a regular basis, such as at team meetings or at the next 4Ls.`,
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
