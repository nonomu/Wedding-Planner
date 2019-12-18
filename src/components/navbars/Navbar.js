import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Link } from "react-router-dom";
import SwipeableTemporaryDrawer from "./SwipeableDrawer";
import { AppBar } from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    flexGrow: 1
  }
});

export default function CenteredTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Paper className={classes.root}>
      <AppBar></AppBar>
      <Tabs
        value={value}
        onChange={handleChange}
        variant='fullWidth'
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        {[
          { name: "Home", link: "/" },
          { name: "Profile", link: "/profile" },
          { name: "Favorites", link: "/favorites" },
          { name: "Overview", link: "/overview" }
        ].map(t => (
          <Tab label={t.name} component={Link} to={t.link} />
        ))}
      </Tabs>
    </Paper>
  );
}
