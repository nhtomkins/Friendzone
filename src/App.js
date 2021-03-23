import React from 'react'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { motion, AnimatePresence } from 'framer-motion'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import { Switch, Route, useLocation } from 'react-router-dom'

import Header from './components/Header'
import Lineup from './components/Lineup'
import Messages from './components/Messages'
import Home from './components/Home'
import { useAuth } from './contexts/AuthContext'
import Profile from './components/Profile'
import PrivateRoute from './components/PrivateRoute'
import useWindowDimensions from './hooks/useWindowDimensions'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Copyright
    </Typography>
  )
}

export default function App() {
  const location = useLocation()
  const theme = useTheme()
  const { currentUser } = useAuth()
  const { height, width } = useWindowDimensions() //use window dimensions instead of 100vh for mobile
  const mobile = useMediaQuery(theme.breakpoints.only('xs'))

  return (
    <Box height={height || '100vh'} overflow="hidden">
      {currentUser && <Header location={location} />}
      <Box
        display="flex"
        flexDirection="column"
        height={
          currentUser
            ? mobile
              ? 'calc(100% - 48px)'
              : 'calc(100% - 56px)'
            : '100%'
        } //subtract the height of the navbar
        overflow="hidden"
      >
        <AnimatePresence exitBeforeEnter initial={false}>
          <Switch location={location} key={location.key}>
            <Route exact path="/" component={Home} />
            <PrivateRoute path="/lineup" component={Lineup} />
            <PrivateRoute path="/messages" component={Messages} />
            <PrivateRoute path="/profile" component={Profile} />
          </Switch>
        </AnimatePresence>
      </Box>
    </Box>
  )
}
