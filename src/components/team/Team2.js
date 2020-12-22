import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  container: {
    justifyContent: 'center'
  },
  avatar: {
    width: theme.spacing(10),
    height: theme.spacing(10),
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: theme.spacing(2)
  },
}));

export default function Team(props) {
  const classes = useStyles();
  
  const content = {
    'header': 'The PowerShell Rangers',
    'description': `It's agile time!`,
    '01_image': 'https://images.unsplash.com/photo-1560298803-1d998f6b5249?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&ah=256&q=80',
    '01_name': 'Richard Hendricks',
    '01_job': 'Chief Executive Officer',
    '02_image': 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&ah=256&q=80',
    '02_name': 'Monica Hall',
    '02_job': 'Chief Financial Officer',
    '03_image': 'https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&ah=256&q=80',
    '03_name': 'Erlich Bachman',
    '03_job': 'Marketing Manager',
    '04_image': 'https://images.unsplash.com/photo-1598627446792-5d89ab3e3540?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&ah=256&q=80',
    '04_name': 'Nelson Bighetti',
    '04_job': 'Majority Investor',
    '05_image': 'https://images.unsplash.com/photo-1598966739654-5e9a252d8c32?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&ah=256&q=80',
    '05_name': 'Bertram Gilfoyle',
    '05_job': 'Chief Systems Architect',
    ...props.content
  };

  
  console.log(content["01_image"])
  return (
    <section>
      <Container maxWidth="md">
        <Box pt={8} pb={12} textAlign="center">
          <Box mb={8}>
            <Typography variant="h4" component="h2" gutterBottom={true}>{content['header']}</Typography>
            <Typography variant="subtitle1" color="textSecondary">{content['description']}</Typography>
          </Box>
          <Grid container spacing={8} className={classes.container}>
            <Grid item xs={6} md={3}>
              <Avatar alt="" src={content['01_image']} className={classes.avatar} />
              <Typography variant="h6" component="h4" gutterBottom={true}>{content['01_name']}</Typography>
              <Typography variant="body1" color="primary" component="span">{content['01_job']}</Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Avatar alt="" src={content['02_image']} className={classes.avatar} />
              <Typography variant="h6" component="h4" gutterBottom={true}>{content['02_name']}</Typography>
              <Typography variant="body1" color="primary" component="span">{content['02_job']}</Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Avatar alt="" src={content['03_image']} className={classes.avatar} />
              <Typography variant="h6" component="h4" gutterBottom={true}>{content['03_name']}</Typography>
              <Typography variant="body1" color="primary" component="span">{content['03_job']}</Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Avatar alt="" src={content['04_image']} className={classes.avatar} />
              <Typography variant="h6" component="h4" gutterBottom={true}>{content['04_name']}</Typography>
              <Typography variant="body1" color="primary" component="span">{content['04_job']}</Typography>
            </Grid>
            <Grid item xs={6} md={3}>
              <Avatar alt="" src={content['05_image']} className={classes.avatar} />
              <Typography variant="h6" component="h4" gutterBottom={true}>{content['05_name']}</Typography>
              <Typography variant="body1" color="primary" component="span">{content['05_job']}</Typography>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </section>
  );
}