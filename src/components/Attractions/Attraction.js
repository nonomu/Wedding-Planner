import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import AttractionCard from './Card';
import { attractions } from '../../stores/Attractions';

@inject("attractions", "user")

@observer
class Attraction extends Component {
    constructor()
    {
        super()
        this.state={
            bool:true
        }
    }
    // componentDidMount=()=>
    // {
    //     this.props.user.removeFavorite
    // }

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
    changeFavoriteState = ()=>{
        this.props.attractions.changeFavoriteState()
    }
    checkIfExist=()=>
    {
        let favorites=this.props.user._userFavorites
        if(favorites.some(f => f.id === this.props.attr.id))
        {
        if(this.state.bool===true)
        return    
        this.setState({bool: true})
        }
        else{
            if(this.state.bool===false)
            return 
            this.setState({bool: false}) 
        }
    }

    componentDidUpdate() {
        // if(this.props.name==="attractions") 
       this.checkIfExist()
    }

    render() {
        let favorites=this.props.user._userFavorites
        let bool=favorites.some(f => f.id === this.props.attr.id)
        let attraction = this.props.attr
        return ({attraction}?<AttractionCard bool={bool}attraction={attraction}removeFavorite={this.removeFavorite} addToFavorites={this.addToFavorites} changeFavoriteState={this.changeFavoriteState}/>:"")
    }
}


export default Attraction
