import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import AttractionCard from './Card';
import { attractions } from '../../stores/Attractions';

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
    bookAttraction=()=>{
        console.log(this.props.attr)
        
    }
    changeFavoriteState = ()=>{
        this.props.attractions.changeFavoriteState()
    }
    render() {
        let attraction = this.props.attr
        return <AttractionCard attraction={attraction} bookAttraction={this.bookAttraction} addButton={this.addButton} removeFavorite={this.removeFavorite} key={attraction.id}/>
    }
}


export default Attraction
