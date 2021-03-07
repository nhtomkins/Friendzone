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

//.filter(value => {
//  return value.toUserId === openUser.userId || value.fromUserId === openUser.userId
//})

const MessageList = ({ openUser }) => {
  const classes = useStyles();
  const theme = useTheme()
  const { messages } = useAuth()


  return (
    <Grid item xs container style={{ padding: "20px 0px 0px 12px", overflow: 'auto' }} 
      direction="column" alignItems="stretch" wrap='nowrap'>
        {messages
        .filter((value) => {
          return value.toUserId === openUser.userId || value.fromUserId === openUser.userId
        })
        .map((msg, index) => (
            <Grid 
              key={index} 
              item 
              container 
              style={{ /*paddingBottom: "12px" */}} 
              justify={msg.hasOwnProperty('fromUserId') ? 'flex-start' : 'flex-end'}
            > 
              <MessageBubble 
                side={msg.hasOwnProperty('fromUserId') ? "left" : "right"} 
                message={msg.message}
                sentAt={msg.sentAt}
              />
            </Grid>
            
        ))}
    </Grid>     
  )    
}

export default MessageList
