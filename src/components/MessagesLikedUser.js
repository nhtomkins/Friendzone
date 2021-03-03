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
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  likedUsers: {
    borderRight: '1px solid grey',
    minWidth: '300px'
  },
  page: {
    height: '95vh'
  },
  userList: {
    width: '100%',
  },
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


const MessagesLikedUser = (props) => {
  const classes = useStyles();

  return (
    <>
      <ListItem alignItems="flex-start" >
        <ListItemAvatar>
          <Avatar alt={props.firstname} src={props.profileImgUrl} />
        </ListItemAvatar>
        <ListItemText
          primary={props.firstname}
          secondary={
            <React.Fragment>
              <Typography variant="body2">
                Wish I could come, but I'm out of town this…
              </Typography>   
              <Typography variant="caption">
                10:45pm
              </Typography>                  
            </React.Fragment>
          }
        />
      </ListItem>
    </>
  )    
}

export default MessagesLikedUser
