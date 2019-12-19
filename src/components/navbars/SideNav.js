import React, { Component } from "react";
import SwipeableTemporaryDrawer from "./SwipeableDrawer";
import { inject, observer } from "mobx-react";
import './navbars.css'
@inject('attractions','user')

@observer
class SideNav extends Component {
  render() {
   let userBookedAttractions=this.props.user.bookedAttractions
    let categories =this.props.attractions.categories
    return (
      <div id="sideNav">
        <SwipeableTemporaryDrawer userBookedAttractions={userBookedAttractions}categories={categories}/>
      </div>
    );
  }
}

export default SideNav;
