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

import { motion, useAnimation } from 'framer-motion'
import { useAuth } from '../../contexts/AuthContext'

import useMediaQuery from '@material-ui/core/useMediaQuery'
import { ExpandMore, FormatColorReset } from '@material-ui/icons'

import { interests } from '../../data/interestsdata'
import { Collapse } from '@material-ui/core'
import ProfileInterests from '../profile/ProfileInterests'

import LocalBarIcon from '@material-ui/icons/LocalBar'
import LocalActivityIcon from '@material-ui/icons/LocalActivity'
import MovieIcon from '@material-ui/icons/Movie'
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import InfoIcon from '@material-ui/icons/Info'

import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'

const useStyles = makeStyles((theme) => ({
  image: {
    display: 'flex',
    maxHeight: '600px',
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
    //maxHeight: 400
  },
  imgLeft: {
    width: '100%',
    objectFit: 'cover',
  },
  imgRight: {
    width: '100%',
    //height: 350,
    objectFit: 'cover',
    borderRadius: 12,
  },
  card: {
    maxWidth: '600px',
    backgroundColor: '#ffffff',
    boxShadow: '0 0 20px 0 rgba(0,0,0,0.12)',
    borderRadius: 12,
    position: 'relative',
    overflow: 'hidden',
  },
  bio: {
    padding: '30px 30px',
    position: 'relative',
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
  expandProfile: {
    width: '100%',
    background: theme.palette.secondary.light,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0)',
    zIndex: 5,
    pointerEvents: 'none',
  },
}))

const LineupProfile = ({ forceMobile = false, ...props }) => {
  const classes = useStyles()
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.only('xs'))
  const controls = useAnimation()
  const { likeUser, unlikeUser, userData } = useAuth()
  const [extended, setExtended] = useState(false)
  const [anchorEl, setAnchorEl] = useState(null)

  const handleLike = (e) => {
    setExtended(false)
    controls.start({
      background: [
        theme.palette.secondary.light,
        theme.palette.secondary.light,
        'rgba(0,0,0,0)',
      ],
      x: ['100%', '0%', '0%'],
      y: ['100%', '0%', '0%'],
      borderRadius: ['50px', '12px', '0'],
      opacity: [1, 0.7, 0],
      transition: { duration: 1 },
    })
    likeUser(props)
  }

  const handleUnlike = (e) => {
    handleClose()
    unlikeUser(props)
  }

  const handleMenu = (e) => {
    setAnchorEl(e.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <motion.div className={classes.card}>
      <Grid container>
        <Grid
          className={classes.image}
          item
          sm={forceMobile || mobile ? 12 : 4}
          xs={12}
        >
          <img
            className={forceMobile || mobile ? classes.imgTop : classes.imgLeft}
            src={
              props.profileImgUrl ||
              'https://firebasestorage.googleapis.com/v0/b/friendzone-dev-1c6af.appspot.com/o/no-user-tall.png?alt=media&token=d01e48ef-4e74-4022-a3ae-abe43be5fd91'
            }
          />
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
              <PlaceIcon className={classes.placeIconStyle} color="disabled" />
              {props.city}
            </Typography>
          </Grid>

          <Grid
            item
            container
            xs
            alignItems="center"
            alignContent="flex-start"
            style={{ paddingBottom: '56px' }}
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

          {props.userId !== userData.userId && (
            <>
              <Typography
                variant="subtitle2"
                align="center"
                color="secondary"
                style={{
                  position: 'absolute',
                  top: '20px',
                  margin: '0 auto',
                  left: '0',
                  right: '0',
                }}
              >
                {props.likedUsers?.includes(userData.userId)
                  ? userData.likedUsers?.includes(props.userId)
                    ? 'You are friends'
                    : 'Already likes you!'
                  : userData.likedUsers?.includes(props.userId) && 'Liked!'}
              </Typography>
              <IconButton
                onClick={handleMenu}
                //color="secondary"
                style={{
                  position: 'absolute',
                  top: '42px',
                  right: '10px',
                  zIndex: '2',
                }}
              >
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="option-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {userData.likedUsers?.includes(props.userId) && (
                  <MenuItem onClick={handleUnlike}>Unlike User</MenuItem>
                )}
                <MenuItem onClick={handleClose}>Hide User</MenuItem>
                <MenuItem onClick={handleClose}>Report User</MenuItem>
              </Menu>
              <IconButton
                onClick={handleLike}
                color="secondary"
                component={motion.div}
                whileHover={{ scale: 1.2 }}
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  right: '14px',
                  zIndex: '2',
                }}
                disabled={userData.likedUsers?.includes(props.userId)}
              >
                {!userData.likedUsers?.includes(props.userId) && (
                  <ThumbUpIcon color="secondary" fontSize="large" />
                )}
              </IconButton>
            </>
          )}
        </Grid>
        {(props.activities ||
          props.lifestyle ||
          props.movies ||
          props.music ||
          props.sports) && (
          <>
            <Collapse in={extended} timeout={500}>
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
            <Grid
              item
              container
              justify="center"
              xs={12}
              className={classes.expandProfile}
            >
              <Grid item xs={12}>
                <Divider />
              </Grid>
              <Grid
                item
                xs={12}
                component={motion.div}
                whileHover={{ marginTop: '4px' }}
                className={classes.expandProfile}
              >
                <ButtonBase
                  disableTouchRipple
                  onClick={() => setExtended((value) => !value)}
                  style={{ width: '100%' }}
                >
                  {extended ? (
                    <ExpandMoreIcon
                      style={{ color: '#f7f7f7', transform: 'rotate(180deg)' }}
                    />
                  ) : (
                    <ExpandMoreIcon style={{ color: '#f7f7f7' }} />
                  )}
                </ButtonBase>
              </Grid>
            </Grid>
          </>
        )}
      </Grid>
      <motion.div className={classes.overlay} animate={controls} />
    </motion.div>
  )
}

export default LineupProfile
