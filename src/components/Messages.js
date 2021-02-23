import React from 'react'
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import { motion } from 'framer-motion';

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
      <Typography variant="h1"> Messages </Typography>
    </Grid>
  )    
}

export default Messages
