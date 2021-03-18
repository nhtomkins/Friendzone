import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import IconButton from '@material-ui/core/IconButton'
import ButtonBase from '@material-ui/core/ButtonBase'
import Divider from '@material-ui/core/Divider'
import Chip from '@material-ui/core/Chip'

import useMediaQuery from '@material-ui/core/useMediaQuery'
import { Autocomplete } from '@material-ui/lab'

import LocalBarIcon from '@material-ui/icons/LocalBar'
import LocalActivityIcon from '@material-ui/icons/LocalActivity'
import MovieIcon from '@material-ui/icons/Movie'
import MusicNoteIcon from '@material-ui/icons/MusicNote'
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter'

const useStyles = makeStyles((theme) => ({
  image: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '8px',
  },
  interestImage: {
    display: 'flex',
    justifyContent: 'center',
    paddingRight: '4%',
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
    padding: '0px 12px 0px 12px',
  },
  placeIconStyle: {
    marginLeft: '2px',
    marginRight: '2px',
  },
}))

const ProfileInterests = (props) => {
  const classes = useStyles()
  const theme = useTheme()
  const mobile = useMediaQuery(theme.breakpoints.only('xs'))

  return (
    <Grid container justify="center">
      <Grid item xs={12} style={{ padding: '0px 24px 24px 24px' }}>
        <Divider />
      </Grid>
      <Grid
        item
        container
        sm={7}
        xs={12}
        justify="center"
        alignItems="center"
        alignContent="center"
      >
        <Grid item style={{ padding: '4px 4px 4px 4px' }}>
          {props.id === 'lifestyle' && (
            <LocalBarIcon
              fontSize="large"
              style={{
                color: theme.palette[props.id].main,
              }}
            />
          )}
          {props.id === 'activities' && (
            <LocalActivityIcon
              fontSize="large"
              style={{
                color: theme.palette[props.id].main,
              }}
            />
          )}
          {props.id === 'movies' && (
            <MovieIcon
              fontSize="large"
              style={{
                color: theme.palette[props.id].main,
              }}
            />
          )}
          {props.id === 'music' && (
            <MusicNoteIcon
              fontSize="large"
              style={{
                color: theme.palette[props.id].main,
              }}
            />
          )}
          {props.id === 'sports' && (
            <FitnessCenterIcon
              fontSize="large"
              style={{
                color: theme.palette[props.id].main,
              }}
            />
          )}
        </Grid>
        <Grid item sm={12} style={{ padding: '0px 4px 0px 4px' }}>
          <Typography variant="h5" align="center">
            {props.title}
          </Typography>
        </Grid>
      </Grid>
      {props.imgUrl && (
        <Grid
          item
          sm={5}
          xs={6}
          className={mobile ? classes.image : classes.interestImage}
        >
          <img className={classes.imgRight} src={props.imgUrl} />
        </Grid>
      )}
      <Grid item xs={12} style={{ padding: '12px 12px 12px 12px' }}>
        {props.interests.map((interest, index) => (
          <React.Fragment key={index}>
            <Chip
              label={interest}
              variant="outlined"
              style={{
                margin: '4px',
                borderColor: theme.palette[props.id].main,
              }}
            />
          </React.Fragment>
        ))}
      </Grid>
    </Grid>
  )
}

export default ProfileInterests
