import React, { Component } from "react";
import SwipeableTemporaryDrawer from "./SwipeableDrawer";
import { inject, observer } from "mobx-react";
import './navbars.css'
@inject('attractions')

@observer
class SideNav extends Component {
  render() {
    return (
      <div id="sideNav">
        <SwipeableTemporaryDrawer categories={this.props.attractions.categories}/>
       
      </div>
    );
  }
}

export default SideNav;
