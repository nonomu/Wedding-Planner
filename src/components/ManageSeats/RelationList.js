import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Invitee from './Invitee';
import { Table } from '@material-ui/core';
import './manage_seats.css'

@inject('manage_seats')

@observer
class RelationList extends Component {
    
    getRelatedInvitees() {
    return this.props.manage_seats.getRelatedInvitees(this.props.relation)
    }    
    render() {
        
        let related = this.getRelatedInvitees()
        return (
            <div>
            <h2>{this.props.relation}</h2>
            <Table striped bordered hover>
                <tr className="listOfInvitees">
                    <th>Name</th>
                    <th>Guests</th>
                    <th>Table Num</th>
                    <th></th>
                </tr>
            {related.map(i => <Invitee currenTableId={this.props.currenTableId.params.currenTableID} key={i.id} details={i} />)}
            </Table>
            </div>
        );
    }
}

export default RelationList;