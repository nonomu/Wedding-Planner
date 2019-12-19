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
  const [count, setCount] = useState(0);
  const classes = useStyles();
  const changeFavoriteState = function() {
    props.changeFavoriteState();
  };
 let attraction=props.attraction

//  const addButton = function(){
//   props.addButton()
// }
// const removeFavorite = function(){
//   props.removeFavorite()
// }
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
            {attraction.attr_name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {attraction.title}
            {attraction.location}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <Rating value={attraction.rating} readOnly/>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Link to={`/book/${attraction.category}/${attraction.id}`}>
        <Button size="small" color="primary">
          Book
        </Button>
<<<<<<< HEAD
        {1 ? (
          <Button  onClick={changeFavoriteState} size="small" color="primary">
=======
        </Link>
        {props.bool ? (
          <Button  onClick={props.removeFavorite} size="small" color="primary">
>>>>>>> 06b972dd1ab631f0315d48e5b590860e0ea5468c
            remove Favorite
          </Button>
        ) : (
          <Button  onClick={props.addToFavorites} size="small" color="primary">
            Add To Favorites
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
