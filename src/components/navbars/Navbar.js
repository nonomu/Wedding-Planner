import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
    width: "100vw",
    height: "auto",
    zIndex: 20,
    position: "fixed",
    top: 0,
  }
});

export default function CenteredTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);


  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Paper className={classes.root} >
      <Tabs
        value={value}
        onChange={handleChange}
        variant='fullWidth'
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        {props.tabs.map(t => (
          <Tab key={t.name} label={t.name} component={Link} to={t.link} />
        ))}
      </Tabs>
    </Paper>
  );
}
