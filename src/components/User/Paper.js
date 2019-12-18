import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CardMedia from "@material-ui/core/CardMedia";

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(3, 2),
  },  media: {
    height: 140,
    width:300,
  }
}));

export default function PaperSheet(props) {
  const classes = useStyles();
  return (
    <Paper id="Paper"className={classes.root}>
                <CardMedia id="cardMedia"
          className={classes.media}
          image={props.attr.image}
          title="Contemplative Reptile"
        />
      <Typography variant="h4" component="h3">
         Booked {props.attr.category} by {props.attr.attr_name}
      </Typography>
      <Typography component="p">
        You can contact {props.attr.contact_name}. Phone: {props.attr.contact_phone}, Mail: {props.attr.contact_email}
      </Typography>
      <Typography component="p">
        The price is: {props.attr.price}
      </Typography>
      <Typography component="p">
        Please Notice That: {props.attr.small_prints}
      </Typography>
    </Paper>
  );
}
