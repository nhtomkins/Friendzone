import React, { useEffect, useState } from 'react'
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  bubble: {
    borderRadius: 12,
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
            backgroundColor: grey[200], 
            whiteSpace: 'pre-line'
          } : { 
            backgroundColor: theme.palette.secondary.main,
            whiteSpace: 'pre-line'
          }}
        >
          {props.message}
        </Typography>
        <Typography variant='body2' align='right' style={{ fontSize: "9pt"}}>
          {props.sentAt.toDate().toLocaleString('en-AU')}
        </Typography>
      </Grid>
    </Grid>
  )
}

export default MessageBubble
