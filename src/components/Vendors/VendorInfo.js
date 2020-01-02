import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import CloseIcon from '@material-ui/icons/Close';
import PhoneIcon from '@material-ui/icons/Phone';
import { Fab, Typography } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AlternateEmailSharpIcon from '@material-ui/icons/AlternateEmailSharp';
import Rating from '@material-ui/lab/Rating';
@inject('user', 'attractions')

@observer
class VendorInfo extends Component {
    openDialog = () => {
        this.props.attractions.openDialog()
    }

    closeDialog = () => {
        this.props.attractions.closeDialog()
    }

    render() {
        let a = this.props.attractions._attractions.length ? this.props.attractions._attractions.find(a => a.id === parseInt(this.props.id)) : []
        return (
            <div className="attraction-info">
                <Fab className="close" onClick={this.props.history.goBack}><CloseIcon /></Fab>
                <div className='attraction-info-title'>
                    <h3>{a.attr_name}</h3>
                    <h4><i>{a.category}</i></h4>
                </div>
                <img src={a.image} title={a.attr_name} alt={a.attr_name} width='600px' height='400px'/>
                <Typography className="attraction-info-bottom">
                <strong><PhoneIcon /> {a.contact_name}  {a.contact_phone}</strong><br/>
                <strong><AlternateEmailSharpIcon /> {a.contact_email}</strong><br/>
                <strong><LocationOnIcon /> {a.location}</strong><br />
                <Rating value={a.rating} readOnly/> <br />
                </Typography>
                <h5>notes: {a.small_prints}</h5>
            </div>
        )
    }
}



export default VendorInfo