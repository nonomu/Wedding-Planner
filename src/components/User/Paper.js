import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import CardMedia from "@material-ui/core/CardMedia";
import './paper.css'
import PhoneIcon from '@material-ui/icons/Phone';
import AlternateEmailSharpIcon from '@material-ui/icons/AlternateEmailSharp';
import PaymentSharpIcon from '@material-ui/icons/PaymentSharp';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2, 1),
  }, media: {
    height: "30vh",
    width: "60%"
  }
}));
export default function PaperSheet(props) {
  const classes = useStyles();
  return (
    <Paper className="bookedAttraction"
      id="Paper"
      className={classes.root}
      style={{ backgroundImage: "rgba(255, 255, 255, 0.3)" }}>
      <Typography variant="h4" component="h3">
        Your {props.attr.category} <br />
        <i>{props.attr.attr_name}</i>
      </Typography>
      <CardMedia id="cardMedia"
        className={classes.media}
        image={props.attr.image}
        title={props.attr.attr_name}
      />
      <div id='detail-box'>
        <div id="col1" >
          <Typography component="p">
            <PhoneIcon /> <strong>{props.attr.contact_name}</strong>:
      {props.attr.contact_phone}, <br />
            <AlternateEmailSharpIcon /> {props.attr.contact_email}
          </Typography>
        </div>
        <div id="col2">
          <Typography id="col2" component="p">
            <PaymentSharpIcon /> Price: {props.attr.price}₪
      </Typography>
          <Typography component="p">
            Please Notice: {props.attr.small_prints}
          </Typography>
        </div>
      </div>
    </Paper>
  );
}
