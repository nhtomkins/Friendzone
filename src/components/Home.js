import React, { useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Modal from '@material-ui/core/Modal'
import Paper from '@material-ui/core/Paper'
import Backdrop from '@material-ui/core/Backdrop'
import Container from '@material-ui/core/Container'
import { useAuth } from '../contexts/AuthContext'

import { Link } from 'react-router-dom'

import Signup from './Signup'
import Signin from './Signin'
import UserHome from './UserHome'

import LocalBarIcon from '@material-ui/icons/LocalBar'
import LocalActivityIcon from '@material-ui/icons/LocalActivity'
import MovieIcon from '@material-ui/icons/Movie'
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter'

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: '60px',
    marginBottom: '16px',
  },
  subtitle: {
    marginBottom: '40px',
  },
  homeButton: {
    marginBottom: '10px',
    width: '150px',
    height: '50px',
    textTransform: 'none',
    borderRadius: 999,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    borderRadius: 12,
    backgroundColor: '#fff',
    maxWidth: '600px',
    boxShadow: '0 0 20px 0 rgba(0,0,0,0.12)',
  },
  page: {
    height: '100vh',
    background: 'rgb(103,58,183)',
    background:
      'linear-gradient(90deg, rgba(103,58,183,1) 0%, rgba(255,167,38,1) 100%)',
  },
}))

const NoUserHome = () => {
  const classes = useStyles()
  const theme = useTheme()
  const [newuser, setNewuser] = useState(false)
  const [open, setOpen] = useState(false)

  const handleSignup = () => {
    setNewuser(true)
    setOpen(true)
  }

  const handleSignin = () => {
    setNewuser(false)
    setOpen(true)
  }

  const handleClose = () => {
    setNewuser(false)
    setOpen(false)
  }
  return (
    <>
      <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.page}
      >
        <Grid
          item
          container
          alignItems="center"
          direction="column"
          className={classes.paper}
        >
          <Grid item xs={12}>
            <Typography variant="h1" align="center" className={classes.title}>
              ignite
            </Typography>
            <Typography
              variant="h6"
              align="center"
              className={classes.subtitle}
            >
              where friendships take off
            </Typography>
          </Grid>
          <Grid item xs={12} style={{ marginBottom: '40px' }}>
            <LocalActivityIcon
              style={{
                color: theme.palette.activities.main,
                fontSize: 60,
                margin: '0 12px',
              }}
            />
            <LocalBarIcon
              style={{
                color: theme.palette.lifestyle.main,
                fontSize: 60,
                margin: '0 12px',
              }}
            />
            <MovieIcon
              style={{
                color: theme.palette.movies.main,
                fontSize: 60,
                margin: '0 12px',
              }}
            />
            <MusicNoteIcon
              style={{
                color: theme.palette.music.main,
                fontSize: 60,
                margin: '0 12px',
              }}
            />
            <FitnessCenterIcon
              style={{
                color: theme.palette.sports.main,
                fontSize: 60,
                margin: '0 12px',
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              size="large"
              variant="contained"
              color="primary"
              className={classes.homeButton}
              onClick={handleSignup}
              disableElevation
            >
              sign up
            </Button>
          </Grid>
          <Grid item xs={12} style={{ marginBottom: '50px' }}>
            <Button
              size="large"
              variant="contained"
              className={classes.homeButton}
              onClick={handleSignin}
              disableElevation
            >
              sign in
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        className={classes.Modal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        style={{ overflow: 'auto' }}
      >
        <Container maxWidth="xs">
          <Paper>{newuser ? <Signup /> : <Signin />}</Paper>
        </Container>
      </Modal>
    </>
  )
}

const Home = () => {
  const classes = useStyles()
  const { currentUser } = useAuth()

  return (
    <div className={classes.homePage}>
      {currentUser ? <UserHome /> : <NoUserHome />}
    </div>
  )
}

export default Home
