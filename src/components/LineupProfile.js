import React from 'react'
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';

import PlaceIcon from '@material-ui/icons/Place';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';

import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';


const useStyles = makeStyles({
  image: {
  },
  img: {
    objectFit: 'cover',
    maxWidth: 200,
    height: 350,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12
  },
  card: {
    maxWidth: 550,
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
    paddingRight: "25px"
  },
  nameage: {
    marginTop: "40px"
  },
  wrapIcon: {
    alignItems: 'center',
    display: 'flex',
    marginTop: '4px',
    marginBottom: '25px'
  },
  placeIconStyle: {
    marginLeft: '2px',
    marginRight: '2px'
  }
});

function calculateAge(birthday) { // birthday is a date
  if(birthday) {
    var today = new Date();
    var birthDate = new Date(birthday.toDate());
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age;
  }
}

const LineupProfile = (props) => {
  const classes = useStyles();
  const { likeUser } = useAuth()

  const handleLike = () => {
    likeUser(props)
  }

  return (
    <Grid className={classes.card} container>
      <Grid className={classes.image} item sm={5} xs={6}>
        {props.profileImgUrl ? <img className={classes.img} src={props.profileImgUrl}/> : 
        <img className={classes.img} src="https://www.uclg-planning.org/sites/default/files/styles/featured_home_left/public/no-user-image-square.jpg"/>
        }
        
      </Grid>
      <Grid  item container sm={7} xs={6} direction="column" className={classes.bio} alignItems="stretch">
        <Grid item className={classes.nameage}> 
          <Box display="flex" alignItems="baseline">
            <Box mr={2} maxWidth="300px" textOverflow="clip">
              <Typography variant="h5"> {props.firstname} </Typography>
            </Box>
            <Typography variant="h6"> {calculateAge(props.birthday)} </Typography>
          </Box>
        </Grid>
        <Grid item>
          <Typography variant="subtitle2" className={classes.wrapIcon}>
            <PlaceIcon className={classes.placeIconStyle} color="disabled"/>
            {props.location}
          </Typography>  
        </Grid>
        <Grid item xs>
          <Typography variant="body1">
            Bit shy at first but once you get to know me I won't stop talking!
          </Typography>
        </Grid>
        <Grid item container justify="flex-start">
          <Grid item xs={12}>
            <Box mb={3} display='flex' justifyContent='flex-end'>
              <IconButton onClick={handleLike} color="primary" component={motion.div} whileHover={{ scale: 1.2 }}>
                <ThumbUpIcon color="primary" fontSize="large"/>
              </IconButton>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default LineupProfile
