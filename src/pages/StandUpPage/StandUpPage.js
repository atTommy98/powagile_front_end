// React
import { useState } from "react";

// Material UI
import { Input } from "@material-ui/core";
import { DialogTitle } from "@material-ui/core";

// CSS
import "./StandUpPage.css";

export default function StandUpPage() {
  const [numberOfParticipants] = useState(5);
  const [minutesPerParticipant] = useState(3);
  const [timeBetweenSpeakers] = useState(20);
  const [totalMeetingTime, setTotalMeetingTime] = useState(0);

  function calculateMeetingTime() {
    const res =
      ((minutesPerParticipant * 60 + timeBetweenSpeakers) / 60) *
      numberOfParticipants;
    setTotalMeetingTime(res);
  }

  return (
    <div>
      <div className="participantsSection">
        <DialogTitle>
          <h2>PowerShell Rangers® StandUp™</h2>
        </DialogTitle>

        <p>Amount of participants</p>
        <Input
          type="number"
          defaultValue={numberOfParticipants}
          onChange={calculateMeetingTime}
        />
        <br />
        <p>Minutes per participant</p>
        <Input type="number" defaultValue={minutesPerParticipant} />
        <br />
        <p>Time between speakers (in seconds)</p>
        <Input type="number" defaultValue={timeBetweenSpeakers} />
        <br />
        <p>Your total meeting time will be:</p>
        <Input
          type="number"
          readOnly={true}
          value={totalMeetingTime}
          disableUnderline={true}
        />
      </div>
    </div>
  );
}
