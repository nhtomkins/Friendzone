import React, { useState, useEffect, useRef } from 'react'
import Grid from '@material-ui/core/Grid'
import { motion } from 'framer-motion'
import { makeStyles, useTheme } from '@material-ui/core/styles'

import MessageBubble from './MessageBubble'

import { useAuth } from '../contexts/AuthContext'
import { grey } from '@material-ui/core/colors'

const useStyles = makeStyles((theme) => ({
  likedUsers: {
    borderRight: '1px solid grey',
    minWidth: '300px',
  },
  page: {
    height: '95vh',
  },
  userList: {
    width: '100%',
  },
  userSelect: {
    borderColor: grey[100],
  },
}))

const containerVariants = {
  from: {
    x: '50vw',
    opacity: 0,
  },
  to: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.15,
      delay: 0.15,
    },
  },
  exit: {
    x: '50vw',
    opacity: 0,
    transition: {
      duration: 0.15,
    },
  },
}

//.filter(value => {
//  return value.toUserId === openUser.userId || value.fromUserId === openUser.userId
//})

const MessageList = ({ openUser }) => {
  const classes = useStyles()
  const theme = useTheme()
  const { messages } = useAuth()

  return (
    <>
      {messages
        .filter((value) => {
          return (
            value.toUserId === openUser.userId ||
            value.fromUserId === openUser.userId
          )
        })
        .map((msg, index) => (
          <Grid
            key={index}
            item
            container
            justify={
              msg.hasOwnProperty('fromUserId') ? 'flex-start' : 'flex-end'
            }
          >
            <MessageBubble
              side={msg.hasOwnProperty('fromUserId') ? 'left' : 'right'}
              message={msg.message}
              sentAt={msg.sentAt}
            />
          </Grid>
        ))}
    </>
  )
}

export default MessageList
