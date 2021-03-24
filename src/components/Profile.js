import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { Input } from '@material-ui/core'
import { MergeTypeSharp } from '@material-ui/icons'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { interests } from '../data/interestsdata'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Grow from '@material-ui/core/Grow'

import LineupProfile from './LineupProfile'

import LocalBarIcon from '@material-ui/icons/LocalBar'
import LocalActivityIcon from '@material-ui/icons/LocalActivity'
import MovieIcon from '@material-ui/icons/Movie'
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter'
import ProfileInterestsSelect from './ProfileInterestsSelect'
import ProfileImages from './ProfileImages'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline'
import HighlightOffIcon from '@material-ui/icons/HighlightOff'

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
  checklist: {
    margin: theme.spacing(0.5),
    background: '#fff',
    padding: '8px 12px',
    borderRadius: 12,
    boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
  },
  wrapIcon: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    display: 'flex',
    margin: '4px',
  },
  spacedIcon: {
    marginRight: '4px',
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
  const theme = useTheme()
  const { writeUserData, userData, getInterestsData } = useAuth()
  const [error, setError] = useState(null)
  const [interestData, setInterestData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let interests = []
    getInterestsData()
      .then((snap) => {
        snap.forEach((doc) => {
          doc.data().items && interests.push(doc.data())
        })
      })
      .then(() => {
        setInterestData(interests)
        setLoading(false)
      })
  }, [])

  return (
    <Box
      style={{
        overflow: 'auto',
        padding: '24px 8px',
        overflowX: 'hidden',
      }}
    >
      <Container maxWidth="md" disableGutters>
        <Grid
          container
          justify="flex-start"
          spacing={4}
          component={motion.div}
          variants={containerVariants}
          initial="from"
          animate="to"
          exit="exit"
        >
          {!loading && (
            <>
              <Grid item sm={6} xs={12}>
                <LineupProfile {...userData} forceMobile={true} />
              </Grid>
              <Grid item container direction="column" sm={6} xs={12}>
                <Grid item className={classes.checklist}>
                  <Typography variant="h5">Profile Checklist</Typography>
                  <Typography variant="subtitle2">
                    To make your profile visible to the world, you need to:
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{
                      color: userData.checklist?.profileImage
                        ? theme.palette.success.dark
                        : theme.palette.error.main,
                    }}
                    className={classes.wrapIcon}
                  >
                    {userData.checklist?.profileImage ? (
                      <CheckCircleOutlineIcon className={classes.spacedIcon} />
                    ) : (
                      <HighlightOffIcon className={classes.spacedIcon} />
                    )}
                    Upload a main profile image
                  </Typography>
                  <Typography
                    variant="body1"
                    style={{
                      color: userData.checklist?.fiveInterests
                        ? theme.palette.success.dark
                        : theme.palette.error.main,
                    }}
                    className={classes.wrapIcon}
                  >
                    {userData.checklist?.fiveInterests ? (
                      <CheckCircleOutlineIcon className={classes.spacedIcon} />
                    ) : (
                      <HighlightOffIcon className={classes.spacedIcon} />
                    )}
                    Select at least 5 interests (from any category)
                  </Typography>
                </Grid>
                <Grid item container className={classes.spacedChips}>
                  <ProfileImages />
                </Grid>
                <Grid item container className={classes.spacedChips}>
                  {interestData.map((cat, i) => (
                    <Grid item container key={i} justify="center" xs={12}>
                      <ProfileInterestsSelect {...cat} />
                    </Grid>
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
