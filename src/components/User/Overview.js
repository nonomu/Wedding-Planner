import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import Paper from './Paper'

@inject("user")
@observer
class Overview extends Component {
  componentDidMount = () => {
    this.props.user.getBookedAttractions();
  };
  componentDidUpdate = () => {
    this.props.user.getBookedAttractions();
  };

  render() {
    let bookedAttractions = this.props.user.bookedAttractions;
    return <div>
      {bookedAttractions.map(ba => <Paper attr={ba} />)}
    </div>
  }
}

export default Overview;
