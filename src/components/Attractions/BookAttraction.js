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
    bookButton = () => {
        
        this.props.user.bookAttraction(this.props.user.userInfo.id, this.props.attraction.id)

    }

    render() {
        let attraction = this.props.attraction

        return (
            <div>
                <img className="attr-img" src={attraction.image} />
                <div className="attr-name">name: {attraction.attr_name}</div>
                <input id="price" type="number" placeholder="Enter Price" onChange={this.handleInputs} />
                <button className="submit-price" onClick={this.bookButton}>Submit</button>
            </div>
        );
    }
}

export default BookAttraction;