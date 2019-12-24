import React, { Component } from 'react';
import { observer, inject } from 'mobx-react'
import RelationList from './RelationList'
@inject('manage_seats')

@observer
class InviteesSideBar extends Component {
render() {
    console.log(this.props.manage_seats.invitees)
return <div id="invitees_side_bar">
    
    {this.props.manage_seats.relations.map(n => <RelationList relation={n} key={n}  />)}

</div>
}
}


export default InviteesSideBar