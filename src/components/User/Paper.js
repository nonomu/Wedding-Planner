import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CardMedia from "@material-ui/core/CardMedia";
import './paper.css'
import PhoneIcon from '@material-ui/icons/Phone';
import EmailIcon from '@material-ui/icons/Email';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2, 1),
  },  media: {
    height: "30vh",
    width: "60%"
  }
}));
export default function PaperSheet(props) {
  const classes = useStyles();
  return ( 
    <div className="bookedAttraction">
    <Paper id="Paper"className={classes.root}>
                <CardMedia id="cardMedia"
          className={classes.media}
          image={props.attr.image}
          title="Contemplative Reptile"
          />
      <Typography variant="h4" component="h3">
         Your {props.attr.category}: {props.attr.attr_name}
      </Typography>
      <Typography component="p">
      <strong>{props.attr.contact_name}</strong>:  <PhoneIcon /> {props.attr.contact_phone}, <EmailIcon /> {props.attr.contact_email}
      </Typography>
      <Typography component="p">
        Price: {props.attr.price}₪
      </Typography>
      <Typography component="p">
        Please Notice: {props.attr.small_prints}
      </Typography>
    </Paper>
    </div>
   );
}
