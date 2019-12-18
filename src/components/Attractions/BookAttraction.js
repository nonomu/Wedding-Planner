import React, { Component } from 'react';
import { observer, inject } from "mobx-react";

@inject('attractions', 'user')

@observer
class BookAttraction extends Component {
    constructor() {
        super();
        this.state = {
            attractionData: [],
            price: 0
        }
    }

    handleInput = e => {
        this.setState({ price: e.target.value })
    }
    bookButton = () => {
        this.props.user.bookAttraction(this.props.user.userInfo.id, this.state.attractionData.id, this.state.price)
    }

    componentDidMount = () => {
        let attractionData = this.props.attractions.getAttractionData(this.props.category, this.props.id)
        this.setState({attractionData})
    }

    render() {
        let attractionData = this.state.attractionData
        return (
            <div>
            { !attractionData ? null : <div>
                <img className="attr-img" src={attractionData.image} alt={attractionData.attr_name} />
                <div className="attr-name">name: {attractionData.attr_name}</div>
                <input id="price" type="number" placeholder="Enter Price" onChange={this.handleInput} />
                <button className="submit-price" onClick={this.bookButton}>Submit</button>
                </div>}
            </div>
        );
    }
}

export default BookAttraction;