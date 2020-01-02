import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { toast as popup } from 'react-toastify'
import Icon from '@material-ui/core/Icon';

@inject('manage_seats')
@observer
class Guest extends Component {
    addInviteeToTable = async () => {
        try {
            let manageTableId = this.props.manageTableId
            let currenTable = this.props.manage_seats.tables.find(t => t.id === manageTableId)
            if (this.props.details.num_invitees + currenTable.seated > currenTable.num_seats)
                throw new Error(`You have reached the maximum amount of seats for this table`)
            let addToTable = await this.props.manage_seats.addInviteeToTable(this.props.details, currenTable)
            popup.success(addToTable)
        } catch (err) {
            popup.error(err.message)
        }
    }
    removeInviteeFromTable = async () => {
        try {
            let manageTableId =this.props.manageTableId
            let currenTable = this.props.manage_seats.tables.find(t => t.id === manageTableId)
            let invitee = this.props.manage_seats.invitees.find(i => i.id === this.props.details.id)
            let removeFromTable = await this.props.manage_seats.removeInviteeFromTable(invitee, currenTable)
            popup.success(removeFromTable)
        }
        catch (err) {
            popup.error(err.message)
        }
    }
    render() {
        let tables = this.props.manage_seats.tables
        let guests=this.props.manage_seats.invitees
        let guest=guests.find(i => i.id === this.props.details.id)
        let tableNum = tables.findIndex(t => t.id === guest.table_id) + 1
        let tablePopId =this.props.manageTableId
        let guestDetails= this.props.details
        return (
            <tr>
                <td>{guestDetails.name} </td>
                <td>{guestDetails.num_invitees}</td>
                <td>{tableNum}</td>
                <td>{guest.table_id !== tablePopId 
                ? <Icon onClick={this.addInviteeToTable} style={{ color: "green" }}>add_circle</Icon> 
                : <Icon onClick={this.removeInviteeFromTable} style={{ color: "red" }}>remove_circle</Icon>}</td>
            </tr>
        );
    }
}
export default Guest;