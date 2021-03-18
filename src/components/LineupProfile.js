import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import ButtonBase from '@material-ui/core/ButtonBase'
import Divider from '@material-ui/core/Divider'
import Chip from '@material-ui/core/Chip'

import PlaceIcon from '@material-ui/icons/Place'
import ThumbUpIcon from '@material-ui/icons/ThumbUp'

import { motion, AnimatePresence, AnimateSharedLayout } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'

import useMediaQuery from '@material-ui/core/useMediaQuery'
import { FormatColorReset } from '@material-ui/icons'

import { interests } from '../data/interestsdata'
import { Collapse } from '@material-ui/core'
import ProfileInterests from './ProfileInterests'

import LocalBarIcon from '@material-ui/icons/LocalBar'
import LocalActivityIcon from '@material-ui/icons/LocalActivity'
import MovieIcon from '@material-ui/icons/Movie'
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter'

const useStyles = makeStyles((theme) => ({
  image: {
    display: 'flex',
    justifyContent: 'center',
  },
  interestImage: {
    display: 'flex',
    justifyContent: 'center',
    paddingRight: '24px',
  },
  interestText: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imgTop: {
    objectFit: 'cover',
    width: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    //maxHeight: 400
  },
  imgLeft: {
    width: '100%',
    height: 350,
    objectFit: 'cover',
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  imgRight: {
    width: '100%',
    //height: 350,
    objectFit: 'cover',
    borderRadius: 12,
  },
  card: {
    maxWidth: 600,
    //height: 350,
    background: '#ffffff',
    boxShadow: '0 0 20px 0 rgba(0,0,0,0.12)',
    borderRadius: 12,
  },
  bio: {
    paddingRight: '24px',
    paddingLeft: '24px',
  },
  nameage: {
    marginTop: '16px',
  },
  wrapIcon: {
    alignItems: 'center',
    display: 'flex',
    marginTop: '4px',
    marginBottom: '25px',
  },
  placeIconStyle: {
    marginLeft: '2px',
    marginRight: '2px',
  },
}))

const LineupProfile = ({ forceMobile = false, ...props }) => {
  const classes = useStyles()
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.only('xs'))
  const { likeUser, userData } = useAuth()
  const [extended, setExtended] = useState(false)

  const handleLike = () => {
    likeUser(props)
  }

  return (
    <motion.div
      className={classes.card}
      whileHover={{ y: '-4px', boxShadow: '0 4px 20px 0 rgba(0,0,0,0.2)' }}
      transition={{ duration: 0.2 }}
    >
      <ButtonBase
        disableTouchRipple
        onClick={() => setExtended((value) => !value)}
      >
        <Grid container justify="center">
          <Grid
            className={classes.image}
            item
            sm={forceMobile || mobile ? 12 : 4}
            xs={12}
          >
            {props.profileImgUrl ? (
              <img
                className={
                  forceMobile || mobile ? classes.imgTop : classes.imgLeft
                }
                src={props.profileImgUrl}
              />
            ) : (
              <img
                className={
                  forceMobile || mobile ? classes.imgTop : classes.imgLeft
                }
                src="https://www.uclg-planning.org/sites/default/files/styles/featured_home_left/public/no-user-image-square.jpg"
              />
            )}
          </Grid>
          <Grid
            item
            container
            sm={forceMobile || mobile ? 12 : 8}
            xs={12}
            direction="column"
            className={classes.bio}
            alignItems="stretch"
          >
            <Grid item style={{ paddingTop: '16px' }}>
              <Typography variant="subtitle2" align="center" color="primary">
                {props.likedUsers?.includes(userData.userId)
                  ? userData.likedUsers?.includes(props.userId)
                    ? 'You are friends'
                    : 'Already likes you!'
                  : userData.likedUsers?.includes(props.userId) && 'Liked!'}
              </Typography>
            </Grid>
            <Grid item className={classes.nameage}>
              <Box display="flex" alignItems="baseline">
                <Box mr={2} maxWidth="300px" textOverflow="clip">
                  <Typography variant="h5" align="left">
                    {' '}
                    {props.firstname}{' '}
                  </Typography>
                </Box>
                <Typography variant="h6"> {props.age} </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Typography variant="subtitle2" className={classes.wrapIcon}>
                <PlaceIcon
                  className={classes.placeIconStyle}
                  color="disabled"
                />
                {props.city}
              </Typography>
            </Grid>
            <Grid
              item
              container
              xs
              alignItems="center"
              alignContent="flex-start"
            >
              <Grid item container xs={12} alignItems="stretch">
                <Grid item>
                  <LocalActivityIcon
                    style={{
                      color: theme.palette['activities'].main,
                      marginRight: '6px',
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Box
                    bgcolor="activities.main"
                    width="100%"
                    height="80%"
                    borderRadius="6px"
                  ></Box>
                </Grid>
              </Grid>
              <Grid item container xs={12} alignItems="stretch">
                <Grid item>
                  <LocalBarIcon
                    style={{
                      color: theme.palette['lifestyle'].main,
                      marginRight: '6px',
                    }}
                  />
                </Grid>
                <Grid item xs={2}>
                  <Box
                    bgcolor="lifestyle.main"
                    width="100%"
                    height="80%"
                    borderRadius="6px"
                  ></Box>
                </Grid>
              </Grid>
              <Grid item container xs={12} alignItems="stretch">
                <Grid item>
                  <MovieIcon
                    style={{
                      color: theme.palette['movies'].main,
                      marginRight: '6px',
                    }}
                  />
                </Grid>
                <Grid item xs={10}>
                  <Box
                    bgcolor="movies.main"
                    width="100%"
                    height="80%"
                    borderRadius="6px"
                  ></Box>
                </Grid>
              </Grid>
              <Grid item container xs={12} alignItems="stretch">
                <Grid item>
                  <MusicNoteIcon
                    style={{
                      color: theme.palette['music'].main,
                      marginRight: '6px',
                    }}
                  />
                </Grid>
                <Grid item xs={3}>
                  <Box
                    bgcolor="music.main"
                    width="100%"
                    height="80%"
                    borderRadius="6px"
                  ></Box>
                </Grid>
              </Grid>
              <Grid item container xs={12} alignItems="stretch">
                <Grid item>
                  <FitnessCenterIcon
                    style={{
                      color: theme.palette['sports'].main,
                      marginRight: '6px',
                    }}
                  />
                </Grid>
                <Grid item xs={9}>
                  <Box
                    bgcolor="sports.main"
                    width="100%"
                    height="80%"
                    borderRadius="6px"
                  ></Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item container justify="flex-start">
              <Grid item xs={12}>
                <Box mb={3} display="flex" justifyContent="flex-end">
                  <IconButton
                    onClick={handleLike}
                    color="primary"
                    component={motion.div}
                    whileHover={{ scale: 1.2 }}
                    disabled={
                      forceMobile || userData.likedUsers?.includes(props.userId)
                    }
                  >
                    {!forceMobile &&
                      !userData.likedUsers?.includes(props.userId) && (
                        <ThumbUpIcon color="primary" fontSize="large" />
                      )}
                  </IconButton>
                </Box>
              </Grid>
            </Grid>
          </Grid>

          <Collapse in={extended}>
            {props.activities && (
              <ProfileInterests
                interests={props.activities}
                id="activities"
                title="Activities"
                imgUrl={props.activitiesImgUrl}
              />
            )}
            {props.lifestyle && (
              <ProfileInterests
                interests={props.lifestyle}
                id="lifestyle"
                title="Lifestyle"
                imgUrl={props.lifestyleImgUrl}
              />
            )}
            {props.movies && (
              <ProfileInterests
                interests={props.movies}
                id="movies"
                title="Movies & TV"
                imgUrl={props.moviesImgUrl}
              />
            )}
            {props.music && (
              <ProfileInterests
                interests={props.music}
                id="music"
                title="Music & Arts"
                imgUrl={props.musicImgUrl}
              />
            )}
            {props.sports && (
              <ProfileInterests
                interests={props.sports}
                id="sports"
                title="Sports & Fitness"
                imgUrl={props.sportsImgUrl}
              />
            )}
          </Collapse>
        </Grid>
      </ButtonBase>
    </motion.div>
  )
}

export default LineupProfile
