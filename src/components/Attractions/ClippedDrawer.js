import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import StarIcon from '@material-ui/icons/Star';
import Attractions from './Attractions';
import { Link } from 'react-router-dom';

const drawerWidth = 230;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 1,
    zIndex: 0
  },
  drawerPaper: {
    width: drawerWidth,
    top: "auto",
    marginTop: "1px"
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}));

export default function ClippedDrawer(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <List>
          {props.categories.map((text, index) => (
            <ListItem button component={Link} to={`/vendors/${text}`} key={text}>
              <ListItemIcon><StarIcon /></ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.category? <Attractions category={props.category} /> : null}
      </main>
    </div>
  );
}