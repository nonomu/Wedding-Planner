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
    // (
    //   <div>
    //     {bookedAttractions.map(a => (
    //       <div key={a.category} className="bookedAttraction">
    //         <h2>{a.category}</h2>
    //         <div>
    //           venue name: {a.attr_name} vendor name:{a.attr_vendor}
    //         </div>
    //         <div>
    //           vendor contact name: {a.contact_name} vendor Phone:{" "}
    //           {a.contact_phone}
    //         </div>
    //         <img className="smallIMG" src={a.image} alt={a.attr_name} />{" "}
    //         <div>The price is: {a.price}</div>
    //       </div>
    //     ))}
    //     <p>add the attractions that the user needs to close </p>
    //   </div>
    // );
  }
}

export default Overview;
