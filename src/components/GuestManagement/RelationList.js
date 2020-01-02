import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Guest from './Guest';
import { Table } from '@material-ui/core';
import './guest-management.css'

@inject('manage_seats')

@observer
class RelationList extends Component {
    
    getRelatedInvitees() {
    return this.props.manage_seats.getRelatedInvitees(this.props.relation)
    }    
    render() {
        let related = this.getRelatedInvitees()
        console.log(this.props)
        let manageTableId=parseInt(this.props.manageTableId.params.manageTableId)
        return (
            <div>
            <h2>{this.props.relation}</h2>
            <Table striped bordered hover>
                <tr className="listOfInvitees">
                    <th>Name</th>
                    <th>Guests</th>
                    <th>Table #</th>
                    <th></th>
                </tr>
            {related.map(i => <Guest manageTableId={manageTableId} key={i.id} details={i} />)}
            </Table>
            </div>
        );
    }
}

export default RelationList;