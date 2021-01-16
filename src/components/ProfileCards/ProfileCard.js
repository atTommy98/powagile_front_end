// try with Card
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import "./ProfileCards.css";
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

export default function ImgMediaCard() {
  const classes = useStyles();

  return (
    <div className="row">
      <div className="column">
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="KawalpreetPhoto"
              height="250"
              image={KawalpreetPhoto}
              title="KawalpreetPhoto"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Kawalpreet Kaur
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Cypress
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
      </div>
      <div className="column">
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="StefanPhoto"
              height="250"
              image={StefanPhoto}
              title="StefanPhoto"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Stefan Kudev
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Socket.io
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
      </div>
      <div className="column">
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="DanielaPhoto"
              height="250"
              image={DanielaPhoto}
              title="DanielaPhoto"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Daniela Leva
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                MongoDB
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
      </div>
      <div className="column">
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="TommyPhoto"
              height="250"
              image={TommyPhoto}
              title="TommyPhoto"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Tommy Holt
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Chart.js
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
      </div>
      <div className="column">
        <Card className={classes.root}>
          <CardActionArea>
            <CardMedia
              component="img"
              alt="JonPhoto"
              height="250"
              image={JonPhoto}
              title="JonPhoto"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Jon Owens
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Agile Management
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Button size="small" color="primary">
              Learn More
            </Button>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}

// tried with grid only below:
// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   paper: {
//     padding: theme.spacing(2),
//     textAlign: "center",
//     color: theme.palette.text.secondary,
//   },
// }));

// export default function FullWidthGrid() {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <Grid container spacing={5}>
//         <Grid item xs={3} sm={3}>
//           <img className="homePagePhotos" src={KawalpreetPhoto} />
//           <Paper className={classes.paper}>Kawalpreet Kaur</Paper>
//         </Grid>
//         <Grid item xs={3} sm={3}>
//           <img className="homePagePhotos" src={StefanPhoto} />
//           <Paper className={classes.paper}>Stefan Kudev</Paper>
//         </Grid>
//         <Grid item xs={3} sm={3}>
//           <img className="homePagePhotos" src={DanielaPhoto} />
//           <Paper className={classes.paper}>Daniela Leva</Paper>
//         </Grid>
//         <Grid item xs={3} sm={3}>
//           <img className="homePagePhotos" src={TommyPhoto} />
//           <Paper className={classes.paper}>Tommy Holt</Paper>
//         </Grid>
//         <Grid item xs={3} sm={3}>
//           <img className="homePagePhotos" src={JonPhoto} />
//           <Paper className={classes.paper}>Jon Owens</Paper>
//         </Grid>
//       </Grid>
//     </div>
//   );
// }

// export default function ProfileCard() {
//   return (
//     <Grid container spacing={3}>
//       <Grid item xs={3}>
//         <div className="stat-container">
//           <img src={DanielaPhoto} />
//           <h3 className="stat-title">Daniela Leva</h3>
//         </div>
//       </Grid>
//       <Grid item xs={3}>
//         <div className="stat-container">
//           <img src={StefanPhoto} />
//           <h3 className="stat-title">Stefan Kudev</h3>
//         </div>
//       </Grid>
//       <Grid item xs={3}>
//         <div className="stat-container">
//           <img src={TommyPhoto} />
//           <h3 className="stat-title">Tommy Holt</h3>
//         </div>
//       </Grid>
//       <Grid item xs={3}>
//         <div className="stat-container">

//           <h3 className="stat-title">Daniela Leva</h3>
//         </div>
//       </Grid>
//       <Grid item xs={3}>
//         <div className="stat-container">
//           <img src={DanielaPhoto} />
//           <h3 className="stat-title">Daniela Leva</h3>
//         </div>
//       </Grid>
//     </Grid>
//   );
// }
