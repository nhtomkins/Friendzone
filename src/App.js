import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { motion, AnimatePresence } from 'framer-motion';

import {
  Switch,
  Route,
  useLocation
} from "react-router-dom";

import Header from './components/Header';
import Lineup from './components/Lineup';
import Messages from './components/Messages';
import Home from './components/Home';
import { useAuth } from './contexts/AuthContext';
import Profile from './components/Profile';
import PrivateRoute from './components/PrivateRoute';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Copyright
    </Typography>
  );
}

export default function App() {
  const location = useLocation();
  const { currentUser } = useAuth()

  return (
    <Box display="flex" height="100vh" flexDirection="column" flexGrow={1} overflow="hidden">
      {currentUser && <Header location={location}/>}      
      <Box display="flex" flexDirection="column" height="calc(100vh - 48px)" flexGrow={1} overflow="hidden">
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
  );
}