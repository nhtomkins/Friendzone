import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: '200px',
    marginBottom: '80px',
  },
  homeButton: {
    marginBottom: '20px',
    width: '140px',
  },
}))

const UserHome = () => {
  const classes = useStyles()

  return (
    <Grid container alignItems={'center'} direction="column">
      <Grid item>
        <Typography variant="h1" className={classes.title}>
          ignite
        </Typography>
      </Grid>
    </Grid>
  )
}

export default UserHome
