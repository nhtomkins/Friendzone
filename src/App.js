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

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      Copyright
    </Typography>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Header />
      <Box mx={4} my={4}>
        <AnimatePresence>
          <Switch location={location} key={location.key}>
            <Route exact path="/">
              <Lineup />
            </Route>
            <Route path="/lineup">
              <Lineup />
            </Route>
            <Route path="/messages">
              <Messages />
            </Route>
          </Switch>
        </AnimatePresence>
      </Box>        
    </div>
  );
}