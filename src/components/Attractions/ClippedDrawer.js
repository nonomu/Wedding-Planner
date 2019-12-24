import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Attractions from './Attractions';
import './attractions.css'
import { Link } from 'react-router-dom';

let drawerWidth = 200;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'grid',
    gridTemplateColumns: '1fr 7fr',
    
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 1,
    zIndex: 0
  },
  closeMenu:{
    color:"red",
    
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  toolbar: theme.mixins.toolbar,
}));
export default function ClippedDrawer(props) {
  const classes = useStyles();
  const changeWidth =()=>{ 
    let element=document.getElementById("drawer")
    let element2=document.getElementById("rootSide")
    // element2.classList.toggle("openedGrid")
    element.classList.toggle("nono")
    element2.classList.toggle("openedGrid")
   element2.classList.add('closedGrid');
    
  }

  return (
    <div>
    <p className={classes.closeMenu} id="openMenu" onClick={changeWidth}>Open</p>
    <div className={`${classes.root} nono openedGrid closedGrid`}  id="rootSide">


      <Drawer id="drawer"
        className={`${classes.drawer}  `}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
       
        <div className={classes.toolbar} />
        <List>
        <p className={classes.closeMenu} id="closeMenu" onClick={changeWidth}>x</p>
          {props.categories.map((text, index) => (
            <ListItem button component={Link} to={`/vendors/${text}`} key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
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
    </div>
  );
}