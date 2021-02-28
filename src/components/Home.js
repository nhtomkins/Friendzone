import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Paper from '@material-ui/core/Paper';
import Backdrop from '@material-ui/core/Backdrop';
import Container from '@material-ui/core/Container';
import { useAuth } from '../contexts/AuthContext'

import { Link } from "react-router-dom";

import Signup from './Signup';
import Signin from './Signin';
import UserHome from './UserHome'

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: '200px',
    marginBottom: '80px',
  },
  homeButton: {
    marginBottom: '20px',
    width: '140px'
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homePage: {

  }
}));

const NoUserHome = () => {
  const classes = useStyles();
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
    <div>
      <Grid container 
        alignItems={"center"} 
        direction="column"
        >
          <Grid item>
            <Typography variant="h1" className={classes.title}>
              Friendzone
            </Typography>
          </Grid>
          <Grid item>
            <Button 
              size="large" 
              variant="contained" 
              color="primary" 
              className={classes.homeButton}
              onClick={handleSignup}
            >
              Sign Up
            </Button>
          </Grid>
          <Grid item>
            <Button 
              size="large" 
              variant="contained" 
              className={classes.homeButton}
              onClick={handleSignin}
            >
              Sign In
            </Button>
          </Grid>
        </Grid>
        <Modal
          open={open}
          onClose={handleClose}
          className={classes.Modal}
          closeAfterTransition
          BackdropComponent={Backdrop}
        >
          <Container maxWidth="xs">
            <Paper>
              {newuser ? <Signup /> : <Signin />}
            </Paper>
          </Container>
        </Modal>
      </div>
  )
}


const Home = () => {
  const classes = useStyles();
  const { currentUser } = useAuth()

  return (
    <div className={classes.homePage}>
      {currentUser ? <UserHome /> : <NoUserHome />}
    </div>
  )
}

export default Home
