import React, { useEffect, useState } from 'react'
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Chip from '@material-ui/core/Chip';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext'
import { Input } from '@material-ui/core';
import { MergeTypeSharp } from '@material-ui/icons';
import { makeStyles } from "@material-ui/core/styles";

import { interests } from '../data/interestsdata'

const useStyles = makeStyles((theme) => ({
  spacedChips: {
    '& > *': {
      margin: theme.spacing(0.5),
    }
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,
  }
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

const Profile = () => {
  const classes = useStyles();
  const { currentUser, userData, updateUserProfileImg, loadPercent, getInterestsData } = useAuth()
  const [file, setFile] = useState(null)
  const [error, setError] = useState(null)
  const [interestData, setInterestData] = useState({})
  const [loading, setLoading] = useState(true)

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

  useEffect(() => {
    async function fetchInterestData() {
      let response = await getInterestsData()
      setInterestData(response)
      
    }

    fetchInterestData()
    setLoading(false)
    
  }, [])

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
      style={{ overflow: 'auto' }}
      wrap='nowrap'
    >
      {loading ? 
      <Grid item>
        <Typography>
          Loading
        </Typography>
      </Grid>
      :
      <>
      <Grid item>
        <Typography variant="h1"> Profile </Typography>
      </Grid>
      <Grid item style={{ display: "flex", justifyContent: "center"}}>
        <img style={{ width: "50%" }} src={userData.profileImgUrl} alt="User profile image"/>
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
      <Grid item className={classes.spacedChips}>
        {interests.map((interest, index) => (
          <React.Fragment key={index}>
            <Chip label={interest} clickable />
          </React.Fragment>          
        ))}
        
      </Grid>
    
      </>
      }
      </Grid>
  )
}

export default Profile
