import React from 'react'
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Container from '@material-ui/core/Container';

import LineupProfile from './LineupProfile';


const Lineup = () => {
  return (
    <Grid container justify={"center"} alignItems={"flex-start"} spacing={6} wrap>
      <Grid item>
        <LineupProfile />
      </Grid>
      <Grid item>
        <LineupProfile />
      </Grid>
      <Grid item>
        <LineupProfile />
      </Grid>
      <Grid item>
        <LineupProfile />
      </Grid>
    </Grid>
  )
}

export default Lineup

