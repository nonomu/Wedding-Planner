import React, { Component } from 'react';
import {observer,inject} from 'mobx-react'
@inject('user')

@observer
class Favorite extends Component {

    removeFavorite=()=> {
        this.props.user.removeFavorite(this.props.user.userInfo.id,this.props.attraction.id)
    }
    render() {
        let attraction = this.props.attraction
        return (
            <div>
                    <h3>{attraction.attr_name}</h3>
                    <div>({attraction.category})</div>
                    <img src={attraction.image} />
                    <div>contact: {attraction.contact_name}  {attraction.contact_phone}  {attraction.contact_email}</div>
                    <div>{attraction.location}</div>
                    <div>rating: {attraction.rating}</div>
                    <div>{attraction.small_prints}</div>
                    <button onClick={this.removeFavorite}>Delete From Your Favorites</button>
            </div>
        );
    }
}
                    
                

export default Favorite;