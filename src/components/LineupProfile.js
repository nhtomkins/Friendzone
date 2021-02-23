import React from 'react'
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';

import PlaceIcon from '@material-ui/icons/Place';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import CardActionArea from '@material-ui/core/CardActionArea';

const useStyles = makeStyles({
  image: {
  },
  img: {
    objectFit: 'cover',
    width: 200,
    height: 350,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12
  },
  card: {
    width: 600,
    height: 350,
    background: '#ffffff',
    boxShadow: '0 0 20px 0 rgba(0,0,0,0.12)',
    borderRadius: 12,
    transition: '0.2s',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 4px 20px 0 rgba(0,0,0,0.2)',
    },
  },
  bio: {
    marginLeft: "25px",
    maxWidth: "350px"
  },
  nameage: {
    marginTop: "40px"
  },
  wrapIcon: {
    alignItems: 'center',
    display: 'inline-flex',
    marginTop: '4px'
  },
  placeIconStyle: {
    marginLeft: '2px',
    marginRight: '2px'
  }
});

const LineupProfile = () => {
  const classes = useStyles();

  return (
    <Grid className={classes.card} container>
      <Grid className={classes.image} item>
        <img className={classes.img} src="https://static.wikia.nocookie.net/parksandrecreation/images/3/38/Leslie.png"/>
      </Grid>
      <Grid  item container xs direction="column" className={classes.bio}>
        <Grid item className={classes.nameage}> 
          <Box display="flex" alignItems="baseline">
            <Box mr={2} maxWidth="300px" textOverflow="clip">
              <Typography variant="h5"> Leslie </Typography>
            </Box>
            <Typography variant="h6"> 34 </Typography>
          </Box>
        </Grid>
        <Grid item xs={2}>
          <Typography variant="subtitle2" className={classes.wrapIcon}>
            <PlaceIcon className={classes.placeIconStyle} color="disabled"/> Sydney
          </Typography>
        </Grid>
        <Grid item xs>
          <Typography variant="body1">
            Bit shy at first but once you get to know me I won't stop talking!
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Box mb={3} display="flex" justifyContent="flex-end" width="350px">
            <IconButton color="primary">
              <ThumbUpIcon color="primary" fontSize="large"/>
            </IconButton>
          </Box>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default LineupProfile
