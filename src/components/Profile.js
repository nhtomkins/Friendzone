import React, { useEffect, useState } from 'react'
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext'
import { Input } from '@material-ui/core';
import { MergeTypeSharp } from '@material-ui/icons';

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
  const { currentUser, userData, updateUserProfileImg, loadPercent } = useAuth()
  const [file, setFile] = useState(null)
  const [error, setError] = useState(null)

  const allowedFileTypes = ['image/png', 'image/jpeg']

  const uploadHandler = (e) => {
    let selected = e.target.files[0];
    
    if (selected && allowedFileTypes.includes(selected.type)) {
      updateUserProfileImg(selected)
      setError('')
    } else {
      setFile(null)
      setError('Please select an image file')
    }
  }

  return (
    <Grid 
      container 
      justify={"flex-start"} 
      alignItems={"center"} 
      spacing={6}
      direction={"column"}
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
        <img src={userData.profileImgUrl} alt="User profile image"/>
      </Grid>
      <Grid item>
        <Typography variant="h4"> {userData.firstname} </Typography>
        <Typography variant="h4"> {currentUser.email} </Typography>        
      </Grid>
      <Grid item>
        <Button 
          variant="contained" 
          component="label"
        > 
          Upload Image 
          <Input 
            type="file" 
            style={{ display: "none" }}
            onChange={uploadHandler}
          />
        </Button>
      </Grid>
    </Grid>
  )
}

export default Profile
