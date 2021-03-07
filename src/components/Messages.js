import React, { useState, useEffect, useRef } from 'react'
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
import MessageList from './MessageList'

import { useAuth } from '../contexts/AuthContext'
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  likedUsers: {
    //borderRight: '1px solid grey',
    minWidth: '300px',
    maxWidth: '300px',
    overflow: 'auto',
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    marginRight: "24px",
    boxShadow: '-4px 0 20px 0 rgba(0,0,0,0.12)',
  },
  page: {
    minHeight: 'calc(100vh - 70px)',
    overflow: 'hidden'
  },
  userList: {
    width: '100%',
  },
  userSelect: {
    borderColor: grey[100]
  },
  messageBox: {
    maxWidth: '1000px',
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    boxShadow: '0 0 20px 0 rgba(0,0,0,0.12)',
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



const Messages = () => {
  const classes = useStyles();
  const theme = useTheme()
  const { friendsLoading, sendPrivateMessage, messagesLoading } = useAuth()
  const [openUser, setOpenUser] = useState({})
  const messageRef = useRef()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  function handleClick(user) {
    setOpenUser(user)

  }

  async function handleSendMessage(e) {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      await sendPrivateMessage(messageRef.current.value, openUser.userId)
      messageRef.current.value = ""
    } catch {
      setError('Failed to send message')
    }

    setLoading(false)
  }


  return (
    <Grid 
      container 
      className={classes.page}
      justify={"center"} 
      //alignItems={"stretch"} 
      component={motion.div}
      spacing={2}
      variants={containerVariants}
      initial="from"
      animate="to"
      exit="exit"
      wrap='nowrap'
    >
      <Grid item container className={classes.likedUsers} xs={3} sm={3} lg={2} wrap='nowrap'>
        {!friendsLoading && !messagesLoading && <FriendsList openUser={openUser} onClick={handleClick}/>}
      </Grid>

      {openUser.firstname ? 

      <Grid item xs sm lg container direction='column' alignItems="stretch" className={classes.messageBox}>
        <Grid item>
          <Box mx={1}>
            <Typography variant="h2">
              {openUser && openUser.firstname}
            </Typography>
          <Divider/>
          </Box>
        </Grid>
        
        {!messagesLoading && <MessageList openUser={openUser}/>}
          
        <Grid item>
          <Box display="flex" mx={1}>
            <TextField 
              id="message-input"
              placeholder="Enter a message"
              variant="outlined"
              fullWidth
              margin="dense"
              multiline
              inputRef={messageRef}
            />
            <Button 
              variant="contained" 
              disableElevation
              style={{ width: "80px", height: "40px", marginLeft: "4px", marginTop: "8px" }}
              color="primary"
              onClick={handleSendMessage}
              disabled={loading}
            >
              SEND
            </Button>
          </Box>
        </Grid>
      </Grid>
       :
      <Grid item xs sm lg container justify="center" alignItems="center" style={{ maxWidth: '1000px' }}>
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
