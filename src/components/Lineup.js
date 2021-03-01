import React from 'react'
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';
import { motion } from 'framer-motion';

import LineupProfile from './LineupProfile';

import { useAuth } from '../contexts/AuthContext'

const containerVariants = {
  from: {
    x: '-50vw',
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
    x: '-50vw',
    opacity: 0,
    transition: {
      duration: 0.15
    }
  }
}


const Lineup = () => {
  const { allUsers } = useAuth()

  return (
    <Grid 
    container 
    justify={"center"} 
    alignItems={"flex-start"} 
    spacing={6} 
    wrap
    component={motion.div}
    variants={containerVariants}
    initial="from"
    animate="to"
    exit="exit"
    >
      {allUsers.map((user, index) => (
        <Grid item key={index}>
          <LineupProfile {...user}/>
        </Grid>
      ))}
    </Grid>
    
  )
}

export default Lineup

