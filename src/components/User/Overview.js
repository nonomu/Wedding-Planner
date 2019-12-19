import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import Paper from './Paper'
import { TextField } from '@material-ui/core';

@inject("user")
@observer
class Overview extends Component {
  componentDidMount = () => {
    this.props.user.getBookedAttractions();
    this.props.user.getWeddingDetails()
  };

  render() {
    let bookedAttractions = this.props.user.bookedAttractions;
    let totalPrice = bookedAttractions.reduce((a,b) => a+b.price,0)
    console.log(totalPrice)
    let getWeddingDetails = this.props.user.userInfo
    let weddingDetailes = this.props.user.userInfo.weddingData ? this.props.user.userInfo.weddingData:""
    return <div>
      <div>
        Total Budgut:{weddingDetailes? weddingDetailes.est_budget:""} <br></br>
        Remaining Budget:{weddingDetailes.est_budget - totalPrice} <br></br>
        Total price Of Booked:{totalPrice}
      </div>
      {bookedAttractions.map(ba => <Paper attr={ba} />)}
    </div>
  }
}

export default Overview;
