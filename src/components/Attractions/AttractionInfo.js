import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import CloseIcon from '@material-ui/icons/Close';
import { Fab } from '@material-ui/core';
@inject('user', 'attractions')

@observer
class AttractionInfo extends Component {
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
                <h3>{a.attr_name}</h3>
                <div>vendor: {a.vendor}</div>
                <div>({a.category})</div>
                <img src={a.image} alt={a.attr_name} />
                <div>contact: {a.contact_name}  {a.contact_phone}  {a.contact_email}</div>
                <div>{a.location}</div>
                <div>rating: {a.rating}</div>
                <div>{a.small_prints}</div>

            </div>
        )
    }
}



export default AttractionInfo