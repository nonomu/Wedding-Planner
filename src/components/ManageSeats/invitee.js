import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {toast as popup} from 'react-toastify'
import { Button } from '@material-ui/core';

@inject('manage_seats')
@observer
class Invitee extends Component {

    addInviteeToTable = async () => {
        try {
            let currentSeats = this.props.manage_seats.currentSeats
            let updatedSeats = currentSeats + this.props.details.num_invitees
            let maxSeats = this.props.manage_seats.selectedTableMaxSeats
            console.log(`Current seats on this table: ${currentSeats}`)
            console.log(`updated seats on this table: ${updatedSeats}`)
            console.log(`maximum seats on this table: ${maxSeats}`)
            
            if (updatedSeats > maxSeats) {
                throw new Error(`You have reached the maximum amount of seats for this table`)
            }
            this.props.manage_seats.currentSeats = updatedSeats
            let addToTable = await this.props.manage_seats.addInviteeToTable(this.props.details.id)
            popup.success(addToTable)
        } catch(err) {
            popup.error(err.message)
        }
    }
    render() {
        let tableId=this.props.details.table_id
        let tables=this.props.manage_seats.tables
        let tableNum= tables.findIndex(t => t.id ===tableId)+1
        return (
            <tr>
                <td>
         {this.props.details.name}
         </td>
         <td>{this.props.details.num_invitees}</td> <td>{tableNum}</td> 
                <td><Button variant="contained" color="primary" onClick={this.addInviteeToTable}>+</Button></td> 
            </tr>
        );
    }
}

export default Invitee;