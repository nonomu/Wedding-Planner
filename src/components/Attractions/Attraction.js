import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import BookAttraction from './BookAttraction';
@inject("attractions","user")

@observer
class Attraction extends Component {

    
    addButton=()=>{
        this.props.user.addToFavorites(this.props.user.userInfo.id,this.props.attr.category.id)
    }



    bookButton=()=>{
        this.props.user.bookAttraction(this.props.user.userInfo.id, this.props.attr.category.id)

    }

    render() {
        let attraction = this.props.attr
    

        return (<div className="attraction-container">
            <h4>This is ATTRACTION (Ori, work on this with the dummy data)</h4>
            <img className="attr-img" src={attraction.image} />
            <div className="attr-name">name: {attraction.attr_name}</div>
            <div className="attr-vendor">vendor: {attraction.attr_vendor}</div>
            <div className="attr-rating">rating: {attraction.rating}</div>
            <button className="add-btn" onClick={this.addButton}>Add to favortis</button>
            <button className="book-btn" onClick={this.bookButton}>Book now!</button>
        </div>)
    }
}


export default Attraction
