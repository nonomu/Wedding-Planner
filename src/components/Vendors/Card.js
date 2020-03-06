import React from "react";
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
    maxWidth: 345,
    margin: "0 20px",
    width: 250
  },
  media: {
    height: 200,
    width: "100%"
  }
});

export default function VendorCard(props) {
  const classes = useStyles();
  const {vendor} = props
  return (
    <Card className={classes.card}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={vendor.image}
          title={classes.media}
          component={Link} to={`/vendorInfo/${vendor.id}`}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {vendor.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
          {vendor.title}
            {vendor.location}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            <Rating value={vendor.rating} readOnly/>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        {!props.isBookedCategory && (
        <Link to={`/book/${vendor.category}/${vendor.id}`}>
        <Button size="small" color="primary">
          Book
        </Button>
        </Link>)}
        {props.isFavorite ? (
          <Button onClick={props.removeFavorite} size="small" color="primary">
            Remove Favorite
          </Button>
        ) : (
          <Button onClick={props.addToFavorites} size="small" color="primary">
            Add To Favorites
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
