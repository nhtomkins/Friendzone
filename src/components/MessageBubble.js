import React, { useEffect, useState } from 'react'
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  bubble: {
    borderRadius: 16,
    padding: "8px 12px 8px 12px",
    marginBottom: "4px"
  }
}));


const MessageBubble = (props) => {
  const classes = useStyles(props);
  const theme = useTheme()

  return (
    <Grid 
      item
      container
      xs={8}
      justify={props.side === "left" ? 'flex-start' : 'flex-end'}
    >
      <Grid item>
        <Typography
          className={classes.bubble}
          style={props.side === "left" ? {
            backgroundColor: grey[300], 
          } : { 
            backgroundColor: theme.palette.secondary.main
          }}
        >
          {props.message}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default MessageBubble
