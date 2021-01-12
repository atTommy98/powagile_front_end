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

// React Router
import { Link } from "react-router-dom";

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
            <Link className="linkWrapper" to="/rituals/standup">
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
            </Link>
          </Grid>
          <Grid item xs>
            <Link className="linkWrapper" to="/rituals/retro">
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
            </Link>
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
