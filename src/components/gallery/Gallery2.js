import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';

const useStyles = makeStyles((theme) => ({
  media: {
    height: '256px'
  },
}));

export default function Gallery(props) {
  const classes = useStyles();
  
  const content = {
    'image1': 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1351&q=80',
    'image2': 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
    'image3': 'https://images.unsplash.com/photo-1573164574572-cb89e39749b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
    ...props.content
  };

  return (
    <Box py={4}>
      <Container maxWidth="lg">
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardActionArea href="#">
                <CardMedia className={classes.media} image={content['image1']} />
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardActionArea href="#">
                <CardMedia className={classes.media} image={content['image2']} />
              </CardActionArea>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardActionArea href="#">
                <CardMedia className={classes.media} image={content['image3']} />
              </CardActionArea>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}