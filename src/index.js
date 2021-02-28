import React from 'react';
import ReactDOM from 'react-dom';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import App from './App';
import theme from './theme';
import {
  BrowserRouter as Router
} from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';

ReactDOM.render(
  <Router>
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </AuthProvider>    
  </Router>,  
  document.querySelector('#root'),
);
