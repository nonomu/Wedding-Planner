import React, { Component } from "react";
import { inject, observer } from "mobx-react";

@inject("user")
@observer
class Overview extends Component {
  componentDidMount = () => {
    this.props.user.getBookedAttractions();
  };

  render() {
    let bookedAttractions = this.props.user.bookedAttractions;
    return (
      <div >
        {bookedAttractions.map(a => 
        <div className="bookedAttraction">
  <h2>{a.category}</h2><div>venue name: {a.attr_name} vendor name:{a.attr_vendor}</div><div>vendor contact name: {a.contact_name} vendor Phone: {a.contact_phone}</div><img className="smallIMG" src={a.image} alt={a.attr_name}/> <div>The price is: {a.price}</div></div>
        )}
        <p>add the attractions that the user needs to close :) </p>
      </div>
    );
  }
}

export default Overview;
