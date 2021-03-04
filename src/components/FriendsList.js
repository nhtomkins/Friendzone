import React, { useState, useEffect } from 'react'
import Grid from "@material-ui/core/Grid";
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import { motion } from 'framer-motion';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import FriendsListItem from './FriendsListItem'

import { useAuth } from '../contexts/AuthContext'
import { grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  likedUsers: {
    borderRight: '1px solid grey',
    minWidth: '300px'
  },
  page: {
    height: '95vh'
  },
  userList: {
    width: '100%',
  },
  userSelect: {
    borderColor: grey[100]
  },
}));

const containerVariants = {
  from: {
    x: '50vw',
    opacity: 0
  },
  to: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.15,
      delay: 0.15
    }
  },
  exit: {
    x: '50vw',
    opacity: 0,
    transition: {
      duration: 0.15
    }
  }
}



const FriendsList = (props) => {
  const classes = useStyles();
  const theme = useTheme()
  const { friendsProfiles } = useAuth()
  const [openMessage, setOpenMessage] = useState({})
  const [friends, setFriends] = useState(null)

  const handleClick = (user) => {
    setOpenMessage(user)
  }

  /*useEffect(() => {
    setFriends(friendsProfiles)
    
  }, [friendsProfiles])
  */

  return ( 
    <List className={classes.userList}>
      {friendsProfiles && friendsProfiles.map((profile, index) => (
        <React.Fragment key={index}>
          <ButtonBase 
            onClick={() => handleClick(profile)} 
            className={classes.userSelect}
            style={profile.userId === openMessage.userId ? {borderLeft: `3px solid ${theme.palette.primary.main}`} : {border: "none"}}
          >
            <FriendsListItem {...profile}/>

          </ButtonBase>
        </React.Fragment>           
      ))}
    </List>
  )    
}

export default FriendsList
