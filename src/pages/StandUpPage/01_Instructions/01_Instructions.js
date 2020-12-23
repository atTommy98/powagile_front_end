// Material UI
import Button from "@material-ui/core/Button";

// CSS
import "./01_Instructions.css";

export default function InstructionsPage({
  nextButton = null,
  backButton = null,
}) {
  return (
    <section className="getStartedPage">
      <h2 className="pageTitle" style={{ textAlign: "center" }}>
        <span className="companyName">Pow!Agile</span>{" "}
        <span className="productName">StandUp™</span>
      </h2>
      <p className="stepsTitleText">
        Tired of unproductive stand-ups that drag on for ages?
        <br />
        With StandUp™, you'll be done in no time at all! It's easy:
      </p>
      <div className="stepsWrapper">
        <div className="stepContainer">
          <span className="stepNumber">1</span>
          <p className="stepText">Enter your meeting participants</p>
        </div>
        <div className="stepContainer">
          <span className="stepNumber">2</span>
          <p className="stepText">Set your desired timing per person</p>
        </div>
        <div className="stepContainer">
          <span className="stepNumber">3</span>
          <p className="stepText">Enjoy a quick, producitve meeting!</p>
        </div>
      </div>

      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={nextButton}
      >
        Get Started &rarr;
      </Button>
      <br />
      <br />
      <Button color="secondary" size="medium" onClick={backButton}>
        &larr; Back
      </Button>
    </section>
  );
}
