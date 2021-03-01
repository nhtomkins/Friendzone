import React from 'react'
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext'

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

const Profile = () => {
  const { currentUser, userData } = useAuth()

  return (
    <Grid 
      container 
      justify={"flex-start"} 
      alignItems={"center"} 
      spacing={6}
      direction={"column"}
      wrap
      component={motion.div}
      variants={containerVariants}
      initial="from"
      animate="to"
      exit="exit"
    >
      <Grid item>
        <Typography variant="h1"> Profile </Typography>
      </Grid>
      <Grid item>
        <Typography variant="h4"> {userData.firstname} </Typography>
        <Typography variant="h4"> {currentUser.email} </Typography>        
      </Grid>
    </Grid>
  )
}

export default Profile
