import React, { Component } from 'react';



class Invitee extends Component {

    render() {
       
        return (
            <div>
                <span>{this.props.details.name}</span>  - <apan>{this.props.details.num_invitees}</apan>
                <button >Add to table</button>
            </div>
        );
    }
}

export default Invitee;