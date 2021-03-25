import React, { useState, useEffect, useRef } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { motion } from 'framer-motion'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import FriendsList from './FriendsList'
import MessageWindow from './MessageWindow'
import LineupProfile from '../lineup/LineupProfile'

import { useAuth } from '../../contexts/AuthContext'
import { grey } from '@material-ui/core/colors'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const useStyles = makeStyles((theme) => ({
  likedUsers: {
    //borderRight: '1px solid grey',
    minWidth: '240px',
    maxWidth: '400px',
    overflow: 'auto',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    marginRight: '16px',
    boxShadow: '0 0 20px 0 rgba(0,0,0,0.12)',
  },
  page: {
    height: '100%',
    overflow: 'hidden',
    padding: '24px',
    maxWidth: '1600px',
    margin: '0 auto',
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

const Messages = () => {
  const classes = useStyles()
  const theme = useTheme()
  const profileColumn = useMediaQuery(theme.breakpoints.up('lg'))
  const messagesColumn = useMediaQuery(theme.breakpoints.up('sm'))

  const { friendsLoading, messagesLoading } = useAuth()
  const [openUser, setOpenUser] = useState({})

  function handleClick(user) {
    setOpenUser(user)
  }

  return (
    <Grid
      container
      className={classes.page}
      justify="center"
      spacing={2}
      component={motion.div}
      variants={containerVariants}
      initial="from"
      animate="to"
      exit="exit"
      wrap="nowrap"
    >
      {!messagesColumn && openUser.firstname ? (
        <MessageWindow openUser={openUser} onClick={handleClick} />
      ) : (
        <Grid
          item
          container
          className={classes.likedUsers}
          sm={3}
          lg={2}
          wrap="nowrap"
        >
          <FriendsList openUser={openUser} onClick={handleClick} />
        </Grid>
      )}

      {messagesColumn && openUser.firstname ? (
        <>
          <MessageWindow openUser={openUser} onClick={handleClick} />

          {profileColumn && (
            <Grid
              item
              lg={3}
              style={{ maxWidth: '400px', overflow: 'auto' }}
              component={motion.div}
              variants={containerVariants}
              initial="from"
              animate="to"
              exit="exit"
            >
              <LineupProfile {...openUser} forceMobile={true} />
            </Grid>
          )}
        </>
      ) : (
        messagesColumn && (
          <Grid
            item
            xs
            sm
            lg
            container
            justify="center"
            alignItems="center"
            style={{ maxWidth: '1000px' }}
          >
            <Grid item>
              <Typography variant="h2">Messages</Typography>
            </Grid>
          </Grid>
        )
      )}
    </Grid>
  )
}

export default Messages
