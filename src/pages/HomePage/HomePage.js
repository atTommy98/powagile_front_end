// React
import React from "react";

// Material UI
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

// Custom Components
import ProductTitle from "../../components/ProductTitle/ProductTitle";
import PlatformLogo from "./images/logo512.png";

// CSS
import "./HomePage.css";

// Unused
import Features4 from "../../components/features/Features4";
import Team2 from "../../components/team/Team2";
import Gallery2 from "../../components/gallery/Gallery2";
import Footer3 from "../../components/footers/Footer3";
import UserDashboard from "../../components/UserDashboard/UserDashboard";

export default function Index(props) {
  return (
    <div>
      <section className="titleSection">
        <Grid container spacing={3}>
          <Grid item xs>
            <img src={PlatformLogo} alt="Pow!Agile Logo"></img>
          </Grid>
          <Grid item xs>
            <h1 className="homePageTitle">Pow!Agile</h1>
            <h2 className="homePageSubTitle">
              We help you run <em>smashing</em> remote agile ceremonies
            </h2>
            <p className="homePageSalesyText">
              We get it - facilitating remote agile ceremonies is hard! So our
              team built two amazing tools to help you be more productive, and
              gain useful insights on how to run your ceremonies better.
              <br />
              <br />
              And the best part? You don't even need an account to get started.
            </p>
          </Grid>
        </Grid>
      </section>

      <Typography
        className="getStartedText"
        variant="h5"
        element="p"
        display="block"
        gutterBottom
      >
        Get started using our free tools 👇
      </Typography>

      <section className="productButtonsSection">
        <Grid container spacing={3}>
          <Grid item xs>
            <Card elevation={3}>
              <CardActionArea>
                <CardContent className="homeStandUpCard">
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    style={{ fontSize: "1.2em" }}
                  >
                    <ProductTitle title="StandUp" />
                  </Typography>
                  <Typography variant="h5" component="p">
                    Our formula for fast and engaging remote standups.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs>
            <Card elevation={3}>
              <CardActionArea>
                <CardContent className="homeRetroCard">
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="h2"
                    style={{ fontSize: "1.2em" }}
                  >
                    <ProductTitle title="Retrospective" />
                  </Typography>
                  <Typography variant="h5" component="p">
                    Real time, collaborative, and engaging retros that make a
                    positive impact on your team.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </section>

      {/* <section className="ourTeam">
        <div className="teamMate">
          <img src="" alt="Daniela Leva - a developer on this project"></img>
          <h3>Daniela Leva</h3>
          <h4>Back End, MongoDB, Mongoose</h4>
          <a href="/">LinkedIn</a>
        </div>
      </section> */}
    </div>
  );
}

// export default function Index(props) {
//   return (
//     <React.Fragment>
//       <Features4
//         content={{
//           header: "There's no I in PowerShell Rangers",
//           "col1-header": "Stay Organised",
//           "col1-desc":
//             "Rough night of drinking last night? Don't want to plan your stand-ups and retros? No problem. Just log in, open up your agile ritual of choice and you're good to go!",
//           "col2-header": "Improve Your Team",
//           "col2-desc":
//             "Engagement data ready to view instantly. Find out who's been watching TikToks instead of attending your morning stand-ups.",
//           "col3-header": "Make It Fun",
//           "col3-desc":
//             "With gamification at the heart of our work, we hope your team will have more fun using our app, keeping engagement levels high!",
//           "col4-header": "Remote Access",
//           "col4-desc":
//             "Designed around a remote world, never fear that your team members are unable to contribute. It will feel like your async team members are right there with you.",
//         }}
//       />

//       <Team2
//         content={{
//           "01_image":
//             "https://ca.slack-edge.com/T6L933W4X-U01ABL9U2QZ-cf9a17f073c1-512",
//           "01_name": "Tommy Holt",
//           "01_job": "Dev",
//           "02_image":
//             "https://ca.slack-edge.com/T6L933W4X-U01A16393UK-e3bc61203f3b-512",
//           "02_name": "Daniela Leva",
//           "02_job": "Also a Dev",
//           "03_image":
//             "https://ca.slack-edge.com/T6L933W4X-U019V870Z4M-gf4edd840c04-512",
//           "03_name": "Stefan Kudev",
//           "03_job": "Dev #3",
//           "04_image":
//             "https://ca.slack-edge.com/T6L933W4X-U01A5FT1UDA-77bc2aa61ade-512",
//           "04_name": "Kawalpreet Kaur",
//           "04_job": "DEV",
//           "05_image": "/images/jon.png",
//           "05_name": "Jon Owens",
//           "05_job": "Devdevdev",
//         }}
//       />

//       <Gallery2 content={null} />

//       <Footer3 content={null} />

//       <UserDashboard></UserDashboard>

//     </React.Fragment>
//   );
// }
