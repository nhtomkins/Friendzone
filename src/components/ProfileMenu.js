import React, { useState } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles } from '@material-ui/core/styles'
import Avatar from '@material-ui/core/Avatar'

import { useAuth } from '../contexts/AuthContext'
import { Link, useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    width: 70,
    height: 40,
  },
  profile: {
    width: theme.spacing(5),
    height: theme.spacing(5),
    border: '2px solid',
    borderColor: theme.palette.primary.main,
  },
}))

const ProfileMenu = () => {
  const classes = useStyles()
  const [anchorEl, setAnchorEl] = useState(null)
  const [error, setError] = useState('')
  const { userData, logout } = useAuth()
  const history = useHistory()

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  async function handleLogout() {
    setError('')

    try {
      await logout()
      setAnchorEl(null)
      history.push('/')
    } catch {
      setError('Failed to log out')
    }
  }

  return (
    <div>
      <IconButton size="small" onClick={handleClick}>
        <Avatar
          className={classes.profile}
          alt={userData.firstname}
          src={userData.profileImgUrl}
        />
      </IconButton>

      <Menu
        id="profile-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} component={Link} to="/profile">
          Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>Settings</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  )
}

export default ProfileMenu
