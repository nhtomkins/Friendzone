import React, { useEffect, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Chip from '@material-ui/core/Chip'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { Collapse, Input } from '@material-ui/core'
import { MergeTypeSharp } from '@material-ui/icons'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { interests } from '../data/interestsdata'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import Grow from '@material-ui/core/Grow'
import ButtonBase from '@material-ui/core/ButtonBase'

import LineupProfile from './LineupProfile'

import LocalBarIcon from '@material-ui/icons/LocalBar'
import LocalActivityIcon from '@material-ui/icons/LocalActivity'
import MovieIcon from '@material-ui/icons/Movie'
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import ImageIcon from '@material-ui/icons/Image'
import PersonIcon from '@material-ui/icons/Person'

const useStyles = makeStyles((theme) => ({
  spacedChips: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
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
    justifyContent: 'flex-start',
    display: 'flex',
  },
  card: {
    background: '#ffffff',
    borderRadius: 12,
    width: '100%',
  },
  image: {
    objectFit: 'cover',
    height: '120px',
    width: '120px',
    borderRadius: 12,
    margin: '12px 12px 11px 12px',
  },
}))

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

const ProfileImages = (props) => {
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
  const [loading, setLoading] = useState(true)
  const [extended, setExtended] = useState(false)

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

  return (
    <motion.div
      className={classes.card}
      whileHover={{ y: '-2px', boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)' }}
      transition={{ duration: 0.1 }}
    >
      <Grid
        item
        container
        xs={12}
        component={ButtonBase}
        disableTouchRipple
        onClick={() => setExtended((value) => !value)}
      >
        <Grid item xs>
          <Typography
            variant="h5"
            align="left"
            style={{ margin: '8px 0 8px 0' }}
            className={classes.wrapIcon}
          >
            <ImageIcon
              fontSize="large"
              style={{
                //color: theme.palette.activities.main,
                margin: '-2px 12px 0px 12px',
              }}
            />
            {`Images ( 1 / 6 )`}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <ExpandMoreIcon />
        </Grid>
      </Grid>

      <Collapse in={extended}>
        <Grid item container alignItems="center" xs={12}>
          <ButtonBase
            style={{
              margin: '12px 12px 12px 12px',
              boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
              width: '100%',
              borderRadius: 12,
            }}
            component={motion.div}
            whileHover={{
              y: '-2px',
              boxShadow: '0 4px 20px 0 rgba(0,0,0,0.2)',
            }}
            transition={{ duration: 0.1 }}
          >
            <Grid item>
              <img
                src="https://www.uclg-planning.org/sites/default/files/styles/featured_home_left/public/no-user-image-square.jpg"
                className={classes.image}
              />
            </Grid>
            <Grid item xs>
              <Typography variant="h6" className={classes.wrapIcon}>
                <PersonIcon
                  style={{
                    //color: theme.palette.activities.main,
                    margin: '-2px 12px 0px 12px',
                  }}
                />
                Profile Image
              </Typography>
            </Grid>
            <Input
              type="file"
              style={{ display: 'none' }}
              onChange={uploadHandler}
            />
          </ButtonBase>
        </Grid>

        <Grid item xs={12}>
          <LocalActivityIcon
            fontSize="large"
            style={{
              color: theme.palette.activities.main,
              margin: '2px 12px 0px 12px',
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <LocalBarIcon
            fontSize="large"
            style={{
              color: theme.palette.lifestyle.main,
              margin: '2px 12px 0px 12px',
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <MovieIcon
            fontSize="large"
            style={{
              color: theme.palette.movies.main,
              margin: '2px 12px 0px 12px',
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <MusicNoteIcon
            fontSize="large"
            style={{
              color: theme.palette.music.main,
              margin: '2px 12px 0px 12px',
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <FitnessCenterIcon
            fontSize="large"
            style={{
              color: theme.palette.sports.main,
              margin: '2px 12px 0px 12px',
            }}
          />
        </Grid>
      </Collapse>
    </motion.div>
  )
}

export default ProfileImages
