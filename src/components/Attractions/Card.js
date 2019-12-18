import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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
  const addButton = function() {
    props.addButton();
  };
  const removeFavorite = function() {
    props.removeFavorite();
  };

  const isFavorite = props.isFavorite();

  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.image}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.location}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.rating}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Book
        </Button>
        {isFavorite ? (
          <Button onClick={removeFavorite} size="small" color="primary">
            remove Favorite
          </Button>
        ) : (
          <Button onClick={addButton} size="small" color="primary">
            Add To Favorites
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
