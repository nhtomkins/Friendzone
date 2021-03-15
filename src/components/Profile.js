import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { Input } from '@material-ui/core'
import { MergeTypeSharp } from '@material-ui/icons'
import { makeStyles } from '@material-ui/core/styles'
import { interests } from '../data/interestsdata'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'

import LineupProfile from './LineupProfile'

const useStyles = makeStyles((theme) => ({
  spacedChips: {
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 100,
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

const Profile = () => {
  const classes = useStyles()
  const {
    currentUser,
    userData,
    updateUserProfileImg,
    loadPercent,
    getInterestsData,
  } = useAuth()
  const [file, setFile] = useState(null)
  const [error, setError] = useState(null)
  const [interestData, setInterestData] = useState(null)
  const [loading, setLoading] = useState(true)

  const allowedFileTypes = ['image/png', 'image/jpeg']

  const uploadHandler = (e) => {
    let selected = e.target.files[0]

    if (selected && allowedFileTypes.includes(selected.type)) {
      updateUserProfileImg(selected)
      setError('')
    } else {
      setFile(null)
      setError('Please select an image file')
    }
  }

  useEffect(() => {
    let interests = []
    getInterestsData()
      .then((snap) => {
        snap.forEach((doc) => {
          doc.data().items && interests.push(doc.data().items)
        })
      })
      .then(() => {
        setInterestData(interests)
        setLoading(false)
      })
  }, [])

  return (
    <Box style={{ overflow: 'auto' }}>
      <Container maxWidth="md">
        <Grid
          container
          justify={'flex-start'}
          spacing={2}
          component={motion.div}
          variants={containerVariants}
          initial="from"
          animate="to"
          exit="exit"
          style={{ padding: '24px 8px 24px 8px' }}
        >
          {!loading && (
            <>
              <Grid item sm={6} xs={12}>
                <LineupProfile {...userData} forceMobile={true} />
              </Grid>
              <Grid item container direction="column" sm={6} xs={12}>
                <Grid item>
                  <Button variant="contained" component="label">
                    Upload Image
                    <Input
                      type="file"
                      style={{ display: 'none' }}
                      onChange={uploadHandler}
                    />
                  </Button>
                </Grid>
                <Grid item className={classes.spacedChips}>
                  {interestData.Activities.map((interest, index) => (
                    <React.Fragment key={index}>
                      <Chip label={interest} clickable />
                    </React.Fragment>
                  ))}
                </Grid>
              </Grid>
            </>
          )}
        </Grid>
      </Container>
    </Box>
  )
}

export default Profile
