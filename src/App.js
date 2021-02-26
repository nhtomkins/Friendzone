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
import Signup from './components/Signup';
import Signin from './components/Signin';
import { AuthProvider } from './contexts/AuthContext';

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
      <AuthProvider>
        <Header />
        <Box mx={4} my={4}>
          <AnimatePresence>
            <Switch location={location} key={location.key}>
              <Route exact path="/">
                <Home />
              </Route>
              <Route path="/lineup">
                <Lineup />
              </Route>
              <Route path="/messages">
                <Messages />
              </Route>
              <Route path="/signup">
                <Signup />
              </Route>
              <Route path="/signin">
                <Signin />
              </Route>
            </Switch>
          </AnimatePresence>
        </Box>        
      </AuthProvider>
      
    </div>
  );
}