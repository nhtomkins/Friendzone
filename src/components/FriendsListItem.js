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
    display: 'inline-block',
    width: '200px'
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
    <ListItem alignItems="flex-start" >
      <ListItemAvatar>
        <Avatar alt={props.firstname} src={props.profileImgUrl} />
      </ListItemAvatar>
      <ListItemText
        primary={props.firstname}
        secondary={
          <React.Fragment>
            <Typography 
              variant="body2"
              component="span"
              className={classes.inline}
              noWrap
            >
              {props.message}
            </Typography>   
            <br />
            <Typography 
              variant="caption"
              component="span"
              className={classes.inline}
            >
              10:45pm
            </Typography>                  
          </React.Fragment>
        }
      />
    </ListItem>
  )    
}

export default MessagesFriend
