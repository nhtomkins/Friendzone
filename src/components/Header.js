import AppBar from '@material-ui/core/AppBar'
import Grid from '@material-ui/core/Grid'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import React from 'react'
import { Tabs } from '@material-ui/core'
import Tab from '@material-ui/core/Tab'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import SearchIcon from '@material-ui/icons/Search'
import ChatIcon from '@material-ui/icons/Chat'

import { Link } from 'react-router-dom'

import ProfileMenu from './ProfileMenu'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  logo: {
    width: 70,
    height: 40,
  },
}))

const Header = (props) => {
  const classes = useStyles()
  const theme = useTheme()
  const [value, setValue] = React.useState(0)
  const mobile = useMediaQuery(theme.breakpoints.only('xs'))

  const handleValue = (props) => {
    if (
      props.location.pathname === '/lineup' ||
      props.location.pathname === '/messages'
    ) {
      return props.location.pathname
    } else {
      return false
    }
  }

  return (
    <nav className={classes.root}>
      <AppBar color="default" position="sticky">
        <Toolbar variant={mobile ? 'regular' : 'dense'}>
          <Grid justify={'space-between'} container alignItems={'center'}>
            <Grid xs={1} item>
              <Typography variant="h5">ignite</Typography>
            </Grid>
            <Grid xs={6} item>
              <Grid container justify="center">
                <Tabs
                  value={handleValue(props)}
                  aria-label="Navigation Tabs"
                  variant="fullWidth"
                  centered
                  indicatorColor="primary"
                >
                  <Tab
                    icon={<SearchIcon />}
                    value="/lineup"
                    component={Link}
                    to="/lineup"
                  />
                  <Tab
                    icon={<ChatIcon />}
                    value="/messages"
                    component={Link}
                    to="/messages"
                  />
                </Tabs>
              </Grid>
            </Grid>
            <Grid item xs={1}>
              <ProfileMenu />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </nav>
  )
}

export default Header
