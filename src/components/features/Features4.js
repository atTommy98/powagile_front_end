import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import StorageIcon from '@material-ui/icons/Storage';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import ShutterSpeedIcon from '@material-ui/icons/ShutterSpeed';
import PublicIcon from '@material-ui/icons/Public';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(1),
  },
  header: {
    [theme.breakpoints.down('md')]: {
      fontSize: theme.typography.h4.fontSize,
      marginBottom: theme.spacing(2),
      textAlign: 'center',
    }
  }
}));

export default function Features(props) {
  const classes = useStyles();

  const content = {
    'badge': 'The New Internet',
    'header': 'We\'ve built a decentralized internet',
    'col1-header': 'Accessibility',
    'col1-desc': 'Ever worried that you won\'t be able to access your data in some places? Nevermore. With PiperNet your connection has no borders.',
    'col2-header': 'Secure',
    'col2-desc': 'Have you ever heard about "not putting all of your eggs in one basket"? Well, with PiperNet you can actually put all your eggs in millions of baskets.',
    'col3-header': 'Speed',
    'col3-desc': '"Loading data" will soon be forgotten same way as floppy discs. With PiperNet algorithm, every data could travel faster than it was ever imaginable.',
    'col4-header': 'Decentralized',
    'col4-desc': 'Decentralized design allows data to flow freely and efficiently. Your data is stored in many places at once. Awesome, right?',
    ...props.content
  };

  return (
    <section>
      <Container maxWidth="lg">
        <Box py={8}>
          <Grid container spacing={6}>
            <Grid item xs={12} lg={4}>
              <Typography variant="h3" component="h2" className={classes.header}>{content['header']}</Typography>
            </Grid>
            <Grid item xs={12} lg={8}>
              <Grid container spacing={6}>
                <Grid item xs={12} sm={6}>
                  <Box mb={2} display="flex" alignItems="center">
                    <StorageIcon color="primary" className={classes.icon} />
                    <Typography variant="h5" component="h3">{content['col1-header']}</Typography>
                  </Box>
                  <Typography variant="body1" component="p">{content['col1-desc']}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box mb={2} display="flex" alignItems="center">
                    <VerifiedUserIcon color="primary" className={classes.icon} />
                    <Typography variant="h5" component="h3">{content['col2-header']}</Typography>
                  </Box>
                  <Typography variant="body1" component="p">{content['col2-desc']}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box mb={2} display="flex" alignItems="center">
                    <ShutterSpeedIcon color="primary" className={classes.icon} />
                    <Typography variant="h5" component="h3">{content['col3-header']}</Typography>
                  </Box>
                  <Typography variant="body1" component="p">{content['col3-desc']}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Box mb={2} display="flex" alignItems="center">
                    <PublicIcon color="primary" className={classes.icon} />
                    <Typography variant="h5" component="h3">{content['col4-header']}</Typography>
                  </Box>
                  <Typography variant="body1" component="p">{content['col4-desc']}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </section>
  );
}