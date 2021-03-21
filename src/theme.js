import { red } from '@material-ui/core/colors'
import { createMuiTheme } from '@material-ui/core/styles'

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    primary: {
      //main: '#6000DA',
      main: '#673ab7',
      light: '#9a67ea',
      dark: '#320b86',
    },
    secondary: {
      //main: '#61ffcd',
      main: '#ffa726',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#f0f0f0',
    },
    lifestyle: {
      main: '#ff8c3b',
    },
    activities: {
      main: '#a47aff',
    },
    movies: {
      main: '#ffd333',
    },
    music: {
      main: '#61cdff',
    },
    sports: {
      main: '#07e6a0',
    },
  },
  typography: {
    h1: {
      fontSize: 72,
      color: '#6000DA',
      fontWeight: 450,
    },
    h5: {
      fontWeight: 500,
      color: '#404040',
      fontSize: 30,
    },
    h6: {
      fontSize: 22,
      color: '#727272',
      fontWeight: 300,
    },
  },
})

export default theme
