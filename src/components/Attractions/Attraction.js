import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import AttractionCard from './Card';
import { attractions } from '../../stores/Attractions';

@inject("attractions", "user")

@observer
class Attraction extends Component {
    removeFavorite = async ()  =>{
      await this.props.user.removeFavorite(this.props.user.userInfo.id,this.props.attr.id)
      console.log("remove")

        // this.setState({bool:true})
    }
    addToFavorites = async () => {
        await this.props.user.addToFavorites(this.props.user.userInfo.id, this.props.attr.id)
        console.log("add")
        // this.setState({bool:false})
    }

    isFavorite = () =>{
        console.log(this.props.user.isFavorite(this.props.attr.id))
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
