import React, { useState, useEffect } from 'react'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import Box from '@material-ui/core/Box'
import { motion } from 'framer-motion'

import LineupProfile from './LineupProfile'

import { useAuth } from '../../contexts/AuthContext'
import { Typography } from '@material-ui/core'
import Chip from '@material-ui/core/Chip'
import PeopleIcon from '@material-ui/icons/People'
import DoneIcon from '@material-ui/icons/Done'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormControl from '@material-ui/core/FormControl'
import Select from '@material-ui/core/Select'

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
    x: '-50vw',
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
    x: '-50vw',
    opacity: 0,
    transition: {
      duration: 0.15,
    },
  },
}

const Lineup = () => {
  const { allUsers, userData } = useAuth()
  const classes = useStyles()

  const [showProfiles, setShowProfiles] = useState('Normal')

  const [lineup, setLineup] = useState([])
  const [lineupFiltered, setLineupFiltered] = useState([])

  const [menFilter, onMenFilter] = useState(true)
  const [womenFilter, onWomenFilter] = useState(true)
  const [otherFilter, onOtherFilter] = useState(true)

  const handleChange = (e) => {
    setShowProfiles(e.target.value)

    switch (e.target.value) {
      case 'Normal':
        setLineup(allUsers)
        break
      case 'Likes me':
        let likesMeArray = []
        allUsers.forEach((user) => {
          if (user.likedUsers.includes(userData.userId)) {
            likesMeArray.push(user)
          }
        })
        setLineup(likesMeArray)
        break
      case 'My likes':
        let myLikesArray = []
        allUsers.forEach((user) => {
          if (userData.likedUsers.includes(user.userId)) {
            myLikesArray.push(user)
          }
        })
        setLineup(myLikesArray)
        break
      case 'Hidden':
        let hiddenArray = []
        setLineup(hiddenArray)
        break
    }
  }

  useEffect(() => {
    setLineup(allUsers)
  }, [allUsers])

  useEffect(() => {
    let filteredLineup = []
    lineup.forEach((profile) => {
      ;((profile.gender === 'male' && menFilter) ||
        (profile.gender === 'female' && womenFilter) ||
        (profile.gender === 'other' && otherFilter)) &&
        filteredLineup.push(profile)
    })

    setLineupFiltered(filteredLineup)
  }, [lineup, menFilter, womenFilter, otherFilter])

  return (
    <Box style={{ overflow: 'auto' }}>
      <Container maxWidth="lg">
        <Grid
          container
          component={motion.div}
          variants={containerVariants}
          initial="from"
          animate="to"
          exit="exit"
          style={{ padding: '24px 8px 24px 8px' }}
        >
          <Grid
            item
            container
            md={2}
            direction="column"
            style={{ paddingBottom: '24px' }}
          >
            <Grid item style={{ paddingBottom: '12px' }}>
              <FormControl className={classes.formControl}>
                <InputLabel id="show-profiles">Show Profiles</InputLabel>
                <Select
                  labelId="show-profiles-label"
                  id="show-profiles"
                  value={showProfiles}
                  onChange={handleChange}
                >
                  <MenuItem value={'Normal'}>Normal</MenuItem>
                  <MenuItem value={'Likes me'}>Likes me</MenuItem>
                  <MenuItem value={'My likes'}>My likes</MenuItem>
                  <MenuItem value={'Hidden'}>Hidden</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item>
              <Typography>Filters</Typography>
            </Grid>

            <Grid item className={classes.spacedChips}>
              <Chip
                label="Men"
                icon={<PeopleIcon />}
                color={menFilter ? 'primary' : 'default'}
                clickable
                onClick={() => onMenFilter((value) => !value)}
              />
              <Chip
                label="Women"
                icon={<PeopleIcon />}
                color={womenFilter ? 'primary' : 'default'}
                clickable
                onClick={() => onWomenFilter((value) => !value)}
              />
              <Chip
                label="Other"
                icon={<PeopleIcon />}
                color={otherFilter ? 'primary' : 'default'}
                clickable
                onClick={() => onOtherFilter((value) => !value)}
              />
            </Grid>
          </Grid>

          <Grid
            item
            container
            justify={'flex-start'}
            alignItems={'center'}
            spacing={4}
            direction="column"
            wrap="nowrap"
            md={8}
          >
            {lineupFiltered.map((user, index) => (
              <Grid item key={index}>
                <LineupProfile {...user} />
              </Grid>
            ))}
          </Grid>

          <Grid item md={2}></Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default Lineup
