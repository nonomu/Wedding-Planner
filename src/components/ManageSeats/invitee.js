import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {toast as popup} from 'react-toastify'

@inject('manage_seats')
@observer
class Invitee extends Component {

    addInviteeToTable = async () => {
        try {
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