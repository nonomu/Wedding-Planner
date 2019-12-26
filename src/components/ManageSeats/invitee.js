import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import {toast as popup} from 'react-toastify'
import { Button } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';

@inject('manage_seats')
@observer
class Invitee extends Component {
    constructor()
    {
        super()
        this.state={
            render:false
        }
    }
    addInviteeToTable = async () => {
        try {
          let currenTableId=parseInt(this.props.currenTableId)
            let currenTable= this.props.manage_seats.tables.find( t => t.id === currenTableId)
            console.log(currenTable)
            if(this.props.details.num_invitees + currenTable.seated > currenTable.num_seats)
            throw new Error(`You have reached the maximum amount of seats for this table`)
            let addToTable = await this.props.manage_seats.addInviteeToTable(this.props.details,currenTable )
            this.setState({render:!this.state.render})
            popup.success(addToTable)
        } catch(err) {
            popup.error(err.message)
        }
    }
    render() {
        let userTableIdNew= this.props.manage_seats.invitees.find(i => i.id === this.props.details.id).table_id
        let userTableId=this.props.details.table_id
        let tables=this.props.manage_seats.tables
        let tableNum= tables.findIndex(t => t.id === userTableId)+1
        
        let tablePopId= parseInt(this.props.currenTableId)
        return (
            <tr>
                <td>
         {this.props.details.name}
         </td>
         <td>{this.props.details.num_invitees}</td> <td>{tableNum}</td> 
                <td>{userTableIdNew!=tablePopId?<Icon  onClick={this.addInviteeToTable} style={{ color: "green" }}>add_circle</Icon>:<Icon  style={{ color: "red" }}>remove_circle</Icon>}</td> 
            </tr>
        );
    }
}
{/* <Button variant="contained" color="primary" onClick={this.addInviteeToTable}>+</Button> */}
export default Invitee;