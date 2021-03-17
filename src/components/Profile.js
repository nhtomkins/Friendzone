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

  const handleClickChip = (category, item) => {
    switch (category) {
      case 'lifestyle':
        if (lifestyle.includes(item)) {
          const newLifestyle = lifestyle.filter((data) => data !== item)
          setLifestyle(newLifestyle)
        } else {
          lifestyle.length < 10 && setLifestyle((current) => [...current, item])
        }
        break
      case 'activities':
        if (activities.includes(item)) {
          const newActivities = activities.filter((data) => data !== item)
          setActivities(newActivities)
        } else {
          activities.length < 10 &&
            setActivities((current) => [...current, item])
        }
        break
      case 'movies':
        if (movies.includes(item)) {
          const newMovies = movies.filter((data) => data !== item)
          setMovies(newMovies)
        } else {
          movies.length < 10 && setMovies((current) => [...current, item])
        }
        break
      case 'music':
        if (music.includes(item)) {
          const newMusic = music.filter((data) => data !== item)
          setMusic(newMusic)
        } else {
          music.length < 10 && setMusic((current) => [...current, item])
        }
        break
      case 'sports':
        if (sports.includes(item)) {
          const newSports = sports.filter((data) => data !== item)
          setSports(newSports)
        } else {
          sports.length < 10 && setSports((current) => [...current, item])
        }
        break
    }
  }

  const handleSave = (e) => {
    setLoading(true)

    writeUserData({ lifestyle, activities, movies, music, sports }).then(() => {
      setLoading(false)
    })
  }

  const checkSelected = (category, item) => {
    switch (category) {
      case 'lifestyle':
        return lifestyle?.includes(item)
      case 'activities':
        return activities?.includes(item)
      case 'movies':
        return movies?.includes(item)
      case 'music':
        return music?.includes(item)
      case 'sports':
        return sports?.includes(item)
    }
  }

  const checkLength = (category) => {
    switch (category) {
      case 'lifestyle':
        return lifestyle?.length
      case 'activities':
        return activities?.length
      case 'movies':
        return movies?.length
      case 'music':
        return music?.length
      case 'sports':
        return sports?.length
    }
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

  useEffect(() => {
    userData.lifestyle && setLifestyle(userData.lifestyle)
    userData.activities && setActivities(userData.activities)
    userData.movies && setMovies(userData.movies)
    userData.music && setMusic(userData.music)
    userData.sports && setSports(userData.sports)
  }, [userData])

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
                <Grid item container className={classes.spacedChips}>
                  {interestData.map((cat, i) => (
                    <Grid item container key={i} justify="center">
                      <Grid item xs={12}>
                        <Typography
                          variant="h5"
                          align="center"
                          style={{ margin: '16px 0 8px 0' }}
                          className={classes.wrapIcon}
                        >
                          {cat.id === 'activities' && (
                            <LocalActivityIcon
                              fontSize="large"
                              style={{
                                color: theme.palette[cat.id].main,
                                margin: '0px 6px 0px 12px',
                              }}
                            />
                          )}
                          {cat.id === 'lifestyle' && (
                            <LocalBarIcon
                              fontSize="large"
                              style={{
                                color: theme.palette[cat.id].main,
                                margin: '0px 6px 0px 12px',
                              }}
                            />
                          )}
                          {cat.id === 'movies' && (
                            <MovieIcon
                              fontSize="large"
                              style={{
                                color: theme.palette[cat.id].main,
                                margin: '0px 6px 0px 12px',
                              }}
                            />
                          )}
                          {cat.id === 'music' && (
                            <MusicNoteIcon
                              fontSize="large"
                              style={{
                                color: theme.palette[cat.id].main,
                                margin: '0px 6px 0px 12px',
                              }}
                            />
                          )}
                          {cat.id === 'sports' && (
                            <FitnessCenterIcon
                              fontSize="large"
                              style={{
                                color: theme.palette[cat.id].main,
                                margin: '0px 6px 0px 12px',
                              }}
                            />
                          )}
                          {`${cat.category} ( ${checkLength(cat.id)} / 10 )`}
                        </Typography>
                      </Grid>
                      <Grid
                        item
                        container
                        justify="center"
                        xs={12}
                        style={{ padding: '0px 12px 0px 12px' }}
                      >
                        {cat.items.map((item, j) => (
                          <>
                            {item.sub && checkSelected(cat.id, item.name) ? (
                              <Grid
                                item
                                key={j}
                                style={{
                                  borderLeft: `3px solid ${
                                    theme.palette[cat.id].main
                                  }`,
                                  borderTopRightRadius: '12px',
                                  borderBottomRightRadius: '12px',
                                  boxShadow: '0 0 20px 0 rgba(0,0,0,0.12)',
                                  margin: '8px 4px 8px 4px',
                                  padding: '4px 8px 4px 8px',
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
                                    backgroundColor: checkSelected(
                                      cat.id,
                                      item.name,
                                    )
                                      ? theme.palette[cat.id].main
                                      : 'inherit',
                                    borderColor: theme.palette[cat.id].main,
                                  }}
                                  onClick={() =>
                                    handleClickChip(cat.id, item.name)
                                  }
                                />
                                {item.sub.map((subitem, k) => (
                                  <React.Fragment key={k}>
                                    <Chip
                                      label={subitem}
                                      clickable
                                      variant="outlined"
                                      style={{
                                        margin: '4px',
                                        backgroundColor: checkSelected(
                                          cat.id,
                                          subitem,
                                        )
                                          ? theme.palette[cat.id].main
                                          : 'inherit',
                                        borderColor: theme.palette[cat.id].main,
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
                                    backgroundColor: checkSelected(
                                      cat.id,
                                      item.name,
                                    )
                                      ? theme.palette[cat.id].main
                                      : 'inherit',
                                    borderColor: theme.palette[cat.id].main,
                                  }}
                                  onClick={() =>
                                    handleClickChip(cat.id, item.name)
                                  }
                                />
                              </Grid>
                            )}
                          </>
                        ))}
                      </Grid>
                    </Grid>
                  ))}
                </Grid>
                <Grid item>
                  <Button variant="contained" onClick={handleSave}>
                    Save Changes
                  </Button>
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
