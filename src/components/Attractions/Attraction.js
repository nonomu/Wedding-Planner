import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import AttractionCard from './Card';

@inject("attractions", "user")

@observer
class Attraction extends Component {
    removeFavorite = async ()  =>{
      await this.props.user.removeFavorite(this.props.user.userInfo.id,this.props.attr.id)
    }
    addToFavorites = async () => {
        await this.props.user.addToFavorites(this.props.user.userInfo.id, this.props.attr.id)
    }

    isFavorite = () =>{
        return this.props.user.isFavorite(this.props.attr.id)
    }
    componentDidMount(){
        this.props.user.getBookedAttractions()
    }
    render() {
        let bookedAttractions=this.props.user.bookedAttractions
        let isBooked=bookedAttractions.some(f => f.category === this.props.attr.category)
        let favorites=this.props.user._userFavorites
        let bool=favorites.some(f => f.id === this.props.attr.id)
        let attraction = this.props.attr
        return ({attraction}?<AttractionCard isBookedCategory={isBooked?this.props.attr.category:"null"} bool={bool} attraction={attraction}removeFavorite={this.removeFavorite} addToFavorites={this.addToFavorites} changeFavoriteState={this.changeFavoriteState}/>:"")
    }
}


export default Attraction
