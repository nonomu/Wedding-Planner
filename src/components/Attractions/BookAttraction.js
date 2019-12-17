import React, { Component } from 'react';
import { observer, inject } from "mobx-react";

@inject('attraction', 'user')

@observer
class BookAttraction extends Component {
    constructor() {
        super();
        this.state = {
            price: 0
        }
    }
    handleInputs = e => {
    this.setState({ price: e.target.value })
    }
    

    render() {
        let attraction = this.props.attr

        return (
            <div>
                <img className="attr-img" src={attraction.image} />
                <div className="attr-name">name: {attraction.attr_name}</div>

                <input id="price" type="number" placeholder="Enter Price" onChange={this.handleInputs} />

                <button className="submit-price">Submit</button>
            </div>
        );
    }
}

export default BookAttraction;