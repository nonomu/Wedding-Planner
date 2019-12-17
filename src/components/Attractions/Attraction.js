import React, { Component } from 'react';
import { observer, inject } from "mobx-react";


@observer
class Attraction extends Component {
    render() {
        let attraction = this.props.attr
        console.log(attraction)


        return (<div className="attraction-container">
            <h4>This is ATTRACTION (Ori, work on this with the dummy data)</h4>
            <img className="attr-img" src={attraction.attr.image} />
            <div className="attr-name">name: {attraction.attr_name}</div>
            <div className="attr-vendor">vendor: {attraction.attr_vendor}</div>
            <div className="attr-rating">rating: {attraction.rating}</div>

        </div>)
    }
}


export default Attraction
