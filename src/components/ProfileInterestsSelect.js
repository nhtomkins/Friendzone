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
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    display: 'flex',
  },
  card: {
    background: '#ffffff',
    borderRadius: 12,
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

const ProfileInterestsSelect = (props) => {
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
  const [changes, setChanges] = useState(false)

  const [interests, setInterests] = useState([])

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

  const handleClickChip = (item) => {
    console.log('handle click chip')
    if (interests.includes(item)) {
      setChanges(true)
      const newInterests = interests.filter((data) => data !== item)
      setInterests(newInterests)
    } else if (interests.length < 10) {
      setChanges(true)
      setInterests((current) => [...current, item])
    } else {
      console.log('You have already selected 10 interests!')
    }
  }

  const handleHighlight = (item) => {
    if (userData.highlights) {
      if (
        userData.highlights?.length < 5 &&
        !userData.highlights.includes(item) &&
        interests.includes(item)
      ) {
        const highlightArray = userData.highlights
        highlightArray.push(item)
        writeUserData({ highlights: highlightArray })
      }
    } else {
      writeUserData({ highlights: [item] })
    }
  }

  const handleSave = (e) => {
    setLoading(true)
    // need to check if interest removed was a highlight, if so remove highlight
    writeUserData({ [props.id]: interests }).then(() => {
      setChanges(false)
      setLoading(false)
    })
  }

  useEffect(() => {
    userData[props.id] && setInterests(userData[props.id])
  }, [userData])

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
            {props.id === 'activities' && (
              <LocalActivityIcon
                fontSize="large"
                style={{
                  color: theme.palette[props.id].main,
                  margin: '2px 12px 0px 12px',
                }}
              />
            )}
            {props.id === 'lifestyle' && (
              <LocalBarIcon
                fontSize="large"
                style={{
                  color: theme.palette[props.id].main,
                  margin: '2px 12px 0px 12px',
                }}
              />
            )}
            {props.id === 'movies' && (
              <MovieIcon
                fontSize="large"
                style={{
                  color: theme.palette[props.id].main,
                  margin: '2px 12px 0px 12px',
                }}
              />
            )}
            {props.id === 'music' && (
              <MusicNoteIcon
                fontSize="large"
                style={{
                  color: theme.palette[props.id].main,
                  margin: '2px 12px 0px 12px',
                }}
              />
            )}
            {props.id === 'sports' && (
              <FitnessCenterIcon
                fontSize="large"
                style={{
                  color: theme.palette[props.id].main,
                  margin: '2px 12px 0px 12px',
                }}
              />
            )}
            {`${props.category} ( ${interests?.length} / 10 )`}
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <ExpandMoreIcon />
        </Grid>
      </Grid>
      <Collapse in={extended}>
        <Grid item container xs={12} style={{ padding: '0px 12px 12px 12px' }}>
          {props.items.map((item, j) => (
            <React.Fragment key={j}>
              {item.sub && interests?.includes(item.name) ? (
                <Grid
                  item
                  key={j}
                  style={{
                    borderLeft: `3px solid ${theme.palette[props.id].main}`,
                    borderTopRightRadius: '12px',
                    borderBottomRightRadius: '12px',
                    boxShadow: '0 0 20px 0 rgba(0,0,0,0.12)',
                    margin: '8px 4px',
                    padding: '4px 8px',
                  }}
                  component={motion.div}
                  variants={subinterestVariants}
                  initial="from"
                  animate="to"
                  exit="exit"
                >
                  <Chip
                    label={item.name}
                    clickable
                    variant="outlined"
                    style={{
                      margin: '4px',
                      backgroundColor: interests?.includes(item.name)
                        ? theme.palette[props.id].main
                        : 'inherit',
                      borderColor: theme.palette[props.id].main,
                    }}
                    onClick={() => handleClickChip(item.name)}
                  />
                  {item.sub.map((subitem, k) => (
                    <React.Fragment key={k}>
                      <Chip
                        label={subitem}
                        clickable
                        variant="outlined"
                        style={{
                          margin: '4px',
                          backgroundColor: interests?.includes(subitem.name)
                            ? theme.palette[props.id].main
                            : 'inherit',
                          borderColor: theme.palette[props.id].main,
                        }}
                      />
                    </React.Fragment>
                  ))}
                </Grid>
              ) : (
                <Grid item key={j}>
                  <Chip
                    label={item.name}
                    clickable
                    variant="outlined"
                    style={{
                      margin: '4px',
                      backgroundColor: interests?.includes(item.name)
                        ? theme.palette[props.id].main
                        : 'inherit',
                      borderColor: theme.palette[props.id].main,
                    }}
                    onClick={() => handleClickChip(item.name)}
                  />
                </Grid>
              )}
            </React.Fragment>
          ))}
        </Grid>

        <Collapse in={changes}>
          <Grid item container xs={12} justify="center">
            <Grid item>
              <Button
                variant="contained"
                onClick={handleSave}
                style={{
                  backgroundColor: theme.palette[props.id].main,
                  margin: '12px 0 12px 0',
                }}
              >
                Save Changes
              </Button>
            </Grid>
          </Grid>
        </Collapse>
      </Collapse>
    </motion.div>
  )
}

export default ProfileInterestsSelect
