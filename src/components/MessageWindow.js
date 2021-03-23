import React, { useState, useEffect, useRef } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { motion } from 'framer-motion'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import MessageList from './MessageList'
import LineupProfile from './LineupProfile'

import Avatar from '@material-ui/core/Avatar'
import Modal from '@material-ui/core/Modal'
import Container from '@material-ui/core/Container'
import Backdrop from '@material-ui/core/Backdrop'
import CloseIcon from '@material-ui/icons/Close'

import { useAuth } from '../contexts/AuthContext'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore'
import IconButton from '@material-ui/core/IconButton'

const useStyles = makeStyles((theme) => ({
  messageBox: {
    //maxWidth: '1000px',
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    boxShadow: '0 0 20px 0 rgba(0,0,0,0.12)',
  },
  avatarLarge: {
    width: '50px',
    height: '50px',
  },
  modal: {
    padding: '60px 0',
    overflow: 'auto',
  },
  noOutline: {
    outline: 0,
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

const MessageWindow = ({ openUser, onClick }) => {
  const classes = useStyles()
  const theme = useTheme()

  const { friendsLoading, sendPrivateMessage, messagesLoading } = useAuth()
  const messageRef = useRef()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [open, setOpen] = useState(false)

  async function handleSendMessage(e) {
    e.preventDefault()

    try {
      setError('')
      setLoading(true)
      await sendPrivateMessage(messageRef.current.value, openUser.userId)
      messageRef.current.value = ''
    } catch {
      setError('Failed to send message')
    }

    setLoading(false)
  }

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <>
      <Grid
        item
        sm
        lg
        container
        direction="column"
        alignItems="stretch"
        className={classes.messageBox}
        component={motion.div}
        variants={containerVariants}
        initial="from"
        animate="to"
        exit="exit"
      >
        <Grid
          item
          container
          alignItems="center"
          style={{ paddingLeft: '8px', paddingRight: '8px' }}
        >
          <Grid item>
            <IconButton aria-label="profile" size="medium" onClick={handleOpen}>
              <Avatar
                className={classes.avatarLarge}
                alt={openUser.firstname}
                src={openUser.profileImgUrl}
              />
            </IconButton>
          </Grid>
          <Grid item xs>
            <Typography variant="h2" display="inline">
              {openUser && openUser.firstname}
            </Typography>
          </Grid>
          <Grid item>
            <IconButton
              aria-label="back"
              size="medium"
              onClick={() => onClick({})}
            >
              <NavigateBeforeIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
        </Grid>
        <Grid
          item
          xs
          container
          style={{ padding: '20px 0px 0px 12px', overflow: 'auto' }}
          direction="column"
          alignItems="stretch"
          wrap="nowrap"
        >
          {!messagesLoading && <MessageList openUser={openUser} />}
        </Grid>

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
              style={{
                width: '80px',
                height: '40px',
                marginLeft: '4px',
                marginTop: '8px',
              }}
              color="primary"
              onClick={handleSendMessage}
              disabled={loading}
            >
              SEND
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        className={classes.modal}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        BackdropComponent={Backdrop}
      >
        <Container className={classes.noOutline} maxWidth="xs">
          <LineupProfile {...openUser} forceMobile={true} />
          <IconButton
            onClick={handleClose}
            style={{
              position: 'fixed',
              top: '20px',
              left: '20px',
              zIndex: '2',
              background: 'rgba(0,0,0,0.2)',
            }}
          >
            <CloseIcon style={{ color: '#fff' }} />
          </IconButton>
        </Container>
      </Modal>
    </>
  )
}

export default MessageWindow
