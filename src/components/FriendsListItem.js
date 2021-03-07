import React from 'react'
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { motion } from 'framer-motion';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  user: {
    borderColor: grey[100]
  },
  inline: {
    display: 'inline-block'
  }
}));

const containerVariants = {
  from: {
    x: '50vw',
    opacity: 0
  },
  to: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.15,
      delay: 0.15
    }
  },
  exit: {
    x: '50vw',
    opacity: 0,
    transition: {
      duration: 0.15
    }
  }
}


const MessagesFriend = (props) => {
  const classes = useStyles();
  const theme = useTheme()

  return (
    <Grid item container style={{ height: "80px" }} xs={12}>
      <Grid item xs={3} container justify="center" alignItems="center">
        <Grid item>
          <Avatar 
            alt={props.firstname} 
            src={props.profileImgUrl} 
          />
        </Grid>
      </Grid>
      <Grid item container xs={9} alignItems="center" style={{ margin: "10px 0px 10px 0px" }}>
        <Grid item xs={12}>
          <Typography align='left' color='textPrimary'>
            {props.firstname}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography 
            variant="body2"
            align='left'
            noWrap
            color='textSecondary'
          >
            {props.message || "New friend!"}
          </Typography>   
        </Grid>
        <Grid item xs={12}>
          <Typography variant="subtitle2" align='left' color='textSecondary' style={{ fontSize: '12px'}}>
            {props.message ? props.sentAt.toDate().toLocaleString('en-AU') : props.addedOn.toDate().toLocaleString('en-AU')}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )    
}

export default MessagesFriend
