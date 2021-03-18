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
    height: '100px',
    width: '100px',
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

const ImageUploadButton = (props) => {
  const classes = useStyles()
  const theme = useTheme()
  const {
    writeUserData,
    userData,
    updateUserImage,
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
      updateUserImage(selected, props.id)
      setError('')
    } else {
      setError('Please select an image file')
    }
  }

  return (
    <Grid item container alignItems="center" xs={12}>
      <Box
        style={{
          margin: '6px 12px 6px 12px',
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
        <ButtonBase style={{ width: '100%' }} component="label">
          <Grid item>
            <img
              src={
                props.image
                  ? props.image
                  : 'https://www.uclg-planning.org/sites/default/files/styles/featured_home_left/public/no-user-image-square.jpg'
              }
              className={classes.image}
            />
          </Grid>
          <Grid item xs>
            <Typography variant="h6" className={classes.wrapIcon}>
              {props.icon}
              {props.title}
            </Typography>
          </Grid>
          <Input
            type="file"
            id="upload-button"
            style={{ display: 'none' }}
            onChange={uploadHandler}
          />
        </ButtonBase>
      </Box>
    </Grid>
  )
}

export default ImageUploadButton
