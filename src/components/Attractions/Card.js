import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Rating from '@material-ui/lab/Rating';
import {Link} from 'react-router-dom'

const useStyles = makeStyles({
  card: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
});

export default function AttractionCard(props) {
  const classes = useStyles();
  const changeFavoriteState = function() {
    props.changeFavoriteState();
  };
 let attraction=props.attraction
//  const isFavorite = props.isFavorite();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={attraction.image}
          title="Contemplative Reptile"
          component={Link} to={`/attractionInfo/${attraction.id}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {attraction.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {attraction.location}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <Rating value={attraction.rating} readOnly/>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Book
        </Button>
        {1 ? (
          <Button onClick={changeFavoriteState} size="small" color="primary">
            remove Favorite
          </Button>
        ) : (
          <Button onClick={changeFavoriteState} size="small" color="primary">
            Add To Favorites
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
