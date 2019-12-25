import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import Invitee from './invitee';


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
    {related.map(i => <Invitee key={i.id} details={i} />)}
            </div>
        );
    }
}

export default RelationList;