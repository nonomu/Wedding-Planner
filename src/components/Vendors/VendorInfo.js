import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import Dialog from '../UI/Dialog/Dialog'

import PhoneIcon from '@material-ui/icons/Phone';
import { Typography } from '@material-ui/core';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import AlternateEmailSharpIcon from '@material-ui/icons/AlternateEmailSharp';
import Rating from '@material-ui/lab/Rating';
@inject('wedding', 'vendors')

@observer
class VendorInfo extends Component {
    
    componentDidMount() {
        if (!this.props.vendors._vendors.length) {
            this.props.vendors.getVendors()
        } 
    }

    render() {
        const id = this.props.match.params.id
        const a = this.props.vendors._vendors.length ? this.props.vendors._vendors.find(a => a.id === parseInt(id)) : []
        return (
            <Dialog>
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

            </Dialog>
        )
    }
}



export default VendorInfo