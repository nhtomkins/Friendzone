import AppBar from "@material-ui/core/AppBar";
import Grid from "@material-ui/core/Grid";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import React from "react";
import { Tabs } from "@material-ui/core";
import Tab from "@material-ui/core/Tab";
import Typography from '@material-ui/core/Typography';

import SearchIcon from '@material-ui/icons/Search';
import ChatIcon from '@material-ui/icons/Chat';
import Avatar from '@material-ui/core/Avatar';

import {
  Link
} from "react-router-dom";

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  },
  logo: {
    width: 70,
    height: 40
  }
});

const Header = () => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  return (
    <nav className={classes.root}>
      <AppBar position="static" color="default" elevation={1}>
        <Toolbar variant="dense">
          <Grid justify={"space-between"} container alignItems={"center"}>
            <Grid xs={1} item>
              <Typography variant="h6">
                Friendzone
              </Typography>
            </Grid>
            <Grid xs={6} item>
              <Grid container justify="center">
                <Tabs
                  onChange={(e, v) => setValue(v)}
                  value={value}
                  aria-label="Navigation Tabs"
                  variant="fullWidth"
                  centered
                >
                  <Tab icon={<SearchIcon />} value="/lineup" component={Link} to="/lineup"/>
                  <Tab icon={<ChatIcon />} value="/messages" component={Link} to="/messages"/>
                </Tabs>
              </Grid>
            </Grid>
            <Grid item xs={1}>
                <Avatar />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </nav>
  );
};

export default Header;