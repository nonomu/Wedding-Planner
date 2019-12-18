import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import AttractionCard from './Card';

@inject("attractions", "user")

@observer
class Attraction extends Component {
    

    removeFavorite = () =>{
        this.props.user.removeFavorite(this.props.user.userInfo.id,this.props.attr.id)
    }
    addButton = () => {
        this.props.user.addToFavorites(this.props.user.userInfo.id, this.props.attr.id)
    }

    isFavorite = () =>{
        console.log(this.props.user.isFavorite(this.props.attr.id))
        return this.props.user.isFavorite(this.props.attr.id)
    }

    render() {
        let attraction = this.props.attr
        return <AttractionCard title={attraction.attr_name} image={attraction.image} location={attraction.location} rating={attraction.rating} addButton={this.addButton} removeFavorite={this.removeFavorite} isFavorite={this.isFavorite} getUserFavorites={this.getUserFavorites}   />
        
    }
}


export default Attraction
