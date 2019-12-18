import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';

@inject("attractions", "user")

@observer
class Attraction extends Component {


    addButton = () => {
        this.props.user.addToFavorites(this.props.user.userInfo.id, this.props.attr.id)
    }

    render() {
        let attraction = this.props.attr

        return (<div className="attraction-container">
            <h4>{attraction.attr_name}</h4>
            <img className="attr-img smallIMG"  src={attraction.image} alt={attraction.attr_name} />
            <div className="attr-vendor">vendor: {attraction.attr_vendor}</div>
            <div className="attr-rating">rating: {attraction.rating}</div>
            <Button color="primary" variant="contained" className="add-btn" onClick={this.addButton}>Add to favorites</Button>
            <Link to={`/book/${attraction.category}/${attraction.id}`}>  
            <Button color="primary" variant="contained" className="book-btn" >Book now!</Button></Link>
        </div>)
    }
}


export default Attraction
