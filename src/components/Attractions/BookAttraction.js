import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
@inject('attraction','user')

@observer
class BookAttraction extends Component {


    render() {
        let attraction = this.props.attr

        return (
            <div>
                <img className="attr-img" src={attraction.image} />
                <div className="attr-name">name: {attraction.attr_name}</div>
                <input type="number" className="price" placeholder="Enter Price"/>
                <button className="submit-price">Submit</button>
            </div>
        );
    }
}

export default BookAttraction;