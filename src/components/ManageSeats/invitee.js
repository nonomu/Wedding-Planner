import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {toast as popup} from 'react-toastify'

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
       
        return (
            <div>
                <span>{this.props.details.name} - {this.props.details.num_invitees}</span>
                <button onClick={this.addInviteeToTable}>Add to table</button>
            </div>
        );
    }
}

export default Invitee;