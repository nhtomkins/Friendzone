import React, { useState, useEffect } from 'react'
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
import ButtonBase from '@material-ui/core/ButtonBase';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import FriendsList from './FriendsList'
import MessageBubble from './MessageBubble'

import { useAuth } from '../contexts/AuthContext'
import { grey } from '@material-ui/core/colors';

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
  userSelect: {
    borderColor: grey[100]
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



const Messages = () => {
  const classes = useStyles();
  const theme = useTheme()
  const { friendsLoading } = useAuth()
  const [openMessage, setOpenMessage] = useState({})
  const [friends, setFriends] = useState(null)

  const handleClick = (user) => {
    setOpenMessage(user)
  }

  /*useEffect(() => {
    setFriends(friendsProfiles)
    
  }, [friendsProfiles])
  */

  return (
    <Grid 
      container 
      className={classes.page}
      justify={"flex-start"} 
      alignItems={"stretch"} 
      component={motion.div}
      spacing={2}
      variants={containerVariants}
      initial="from"
      animate="to"
      exit="exit"
    >
      <Grid item className={classes.likedUsers} xs={3} sm={3} lg={2}>
        {!friendsLoading && <FriendsList />}
      </Grid>

      {openMessage.uid ? 
      <Grid item xs sm lg container direction="column" alignItems="stretch">
        <Grid item>
          <Typography variant="h2">
            {openMessage && openMessage.firstname}
          </Typography>
          <Divider/>
        </Grid>
        <Grid item xs container style={{ padding: "20px 0px 0px 12px" }} 
        direction="column" alignItems="stretch">
          <Grid item container style={{ paddingBottom: "12px" }} justify='flex-start'> 
            <MessageBubble 
              side="left" 
              message="Wish i could come, but I'm out of town this weekend. Thanks for the invite!"
            />
          </Grid>
          <Grid item container style={{ paddingBottom: "12px" }} justify='flex-end'>
            <MessageBubble 
              side="right" 
              message="All good, enjoy your weekend!"
            />
            <MessageBubble 
              side="right" 
              message="Oh and one more thing, we are no longer friends"
            />
          </Grid>
        </Grid>
        <Grid item>
          <Box display="flex">
            <TextField 
              id="message-input"
              placeholder="Enter a message"
              variant="outlined"
              fullWidth
              margin="dense"
              multiline
            />
            <Button 
              variant="contained" 
              disableElevation
              style={{ width: "80px", height: "40px", marginLeft: "4px", marginTop: "8px" }}
              color="primary"
            >
              SEND
            </Button>
          </Box>
        </Grid>
      </Grid>
       :
      <Grid item xs sm lg container justify="center">
        <Grid item>
          <Typography variant="h2">
            Messages
          </Typography>
        </Grid>
      </Grid>
      }
    </Grid>
  )    
}

export default Messages
