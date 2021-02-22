import React from 'react'
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

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
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8
  },
  card: {
    width: 500,
    height: 350,
    background: '#ffffff',
    boxShadow: '0 0 20px 0 rgba(0,0,0,0.12)',
    borderRadius: 8,
    transition: '0.2s',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 4px 20px 0 rgba(0,0,0,0.2)',
    },
  },
  fullname: {
    margin: "20px 0 0 10px",
  }
});

const LineupProfile = () => {
  const classes = useStyles();

  return (
    <Grid className={classes.card} container>
      <Grid className={classes.image} item>
        <img className={classes.img} src="https://static.wikia.nocookie.net/parksandrecreation/images/3/38/Leslie.png"/>
      </Grid>
      <Grid className={classes.fullname} item>
        <Typography variant="h5">
          Leslie Knope
        </Typography>
      </Grid>
    </Grid>
  )
}

export default LineupProfile
