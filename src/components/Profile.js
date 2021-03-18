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
  wrapIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    marginTop: '4px',
    marginBottom: '25px',
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

const subinterestVariants = {
  from: {
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
    opacity: 0,
    transition: {
      duration: 0.15,
    },
  },
}

const Profile = () => {
  const classes = useStyles()
  const theme = useTheme()
  const {
    writeUserData,
    userData,
    updateUserProfileImg,
    loadPercent,
    getInterestsData,
  } = useAuth()
  const [error, setError] = useState(null)
  const [interestData, setInterestData] = useState(null)
  const [loading, setLoading] = useState(true)

  const [lifestyle, setLifestyle] = useState([])
  const [activities, setActivities] = useState([])
  const [movies, setMovies] = useState([])
  const [music, setMusic] = useState([])
  const [sports, setSports] = useState([])

  const allowedFileTypes = ['image/png', 'image/jpeg']

  const uploadHandler = (e) => {
    let selected = e.target.files[0]

    if (selected && allowedFileTypes.includes(selected.type)) {
      updateUserProfileImg(selected)
      setError('')
    } else {
      setError('Please select an image file')
    }
  }

  const handleSave = (e) => {
    setLoading(true)

    writeUserData({ lifestyle, activities, movies, music, sports }).then(() => {
      setLoading(false)
    })
  }

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
        padding: '24px 8px 24px 8px',
        overflowX: 'hidden',
      }}
    >
      <Container maxWidth="md" disableGutters>
        <Grid
          container
          justify={'flex-start'}
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
