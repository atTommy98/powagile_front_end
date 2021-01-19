// Material UI
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

//CSS
import "./OurTeam.css";

//import photos
import DanielaPhoto from "../../../src/pages/HomePage/images/DanielaLeva.jpg";
import StefanPhoto from "../../../src/pages/HomePage/images/StefanKudev.jpg";
import TommyPhoto from "../../../src/pages/HomePage/images/TommyHolt.jpg";
import KawalpreetPhoto from "../../../src/pages/HomePage/images/KawalpreetKaur.jpg";
import JonPhoto from "../../../src/pages/HomePage/images/JonOwens.jpg";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});

const Teammates = [
  {
    name: "Kawalpreet Kaur",
    responsibilities: ["Cypress", "Auth0", "Back End"],
    photo: KawalpreetPhoto,
  },
  {
    name: "Stefan Kudev",
    responsibilities: ["Socket.io", "UI/UX", "Deployment"],
    photo: StefanPhoto,
  },
  {
    name: "Daniela Leva",
    responsibilities: ["Express Server", "MongoDB", "Back End"],
    photo: DanielaPhoto,
  },
  {
    name: "Tommy Holt",
    responsibilities: ["User Stats", "Chart.js", "Front End"],
    photo: TommyPhoto,
  },
  {
    name: "Jon Owens",
    responsibilities: [
      "Agile Methodologies",
      "Product Research",
      "Product Vision",
    ],
    photo: JonPhoto,
  },
];

export default function OurTeam() {
  const classes = useStyles();

  return (
    <div className="row">
      {Teammates.map((el) => (
        <div className="column">
          <Card className={classes.root}>
            <CardActionArea>
              <CardMedia
                component="img"
                alt={el.name}
                height="250"
                image={el.photo}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {el.name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {el.responsibilities.map((el) => (
                    <li>{el}</li>
                  ))}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </div>
      ))}
    </div>
  );
}
