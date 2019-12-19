import React, { Component } from 'react';
import { observer, inject } from "mobx-react";
import CloseIcon from '@material-ui/icons/Close';
import { Fab } from '@material-ui/core';
import {Link} from 'react-router-dom'
import DoneIcon from '@material-ui/icons/Done';
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
            { !attractionData ? null : <div className="attraction-info">
                <Fab className="close" component={Link} to={`/attractions/${attractionData.category}`}><CloseIcon /></Fab>


                {/* <img className="attr-img" src={attractionData.image} alt={attractionData.attr_name} />
                <div className="attr-name">name: {attractionData.attr_name}</div> */}

                <h2>Wohooooo Congrats !!</h2>
                <img src="https://www.vippng.com/png/detail/5-50383_emojis-transparent-png-party-emoji-png.png" style={{width:"250px"}} alt="happyEmoji"/>
                <h4>We happy to hear that you booked this attraction, we sure that you will be happy.</h4>
            <p>Please don`t forget to leave a review about this {attractionData.category} attractiongit.<br></br>
            All we need is to know the price that you agreed with {attractionData.contact_name} in order to manage your wedding budget.<br></br>
            You can get any details about booked attractions from the "Overview" page.
            </p>

                <input id="price" type="number" placeholder="Enter Price" onChange={this.handleInput} />

                
                <Fab className="submit-price" onClick={this.bookButton} component={Link} to="/overview"><DoneIcon /></Fab>
                </div>}
            </div>
        );
    }
}

export default BookAttraction;