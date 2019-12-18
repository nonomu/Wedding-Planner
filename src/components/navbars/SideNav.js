import React, { Component } from "react";
import { Link } from "react-router-dom";
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
        {/* <div>
          <Link to="/attractions/venue">
            Venues
          </Link>
        </div>
        <div>
          <Link to="/attractions/photographer">
            Photographer
          </Link>
        </div>
        <div>
          <Link to="/attractions/dj">
            DJ
          </Link>
        </div> */}
      </div>
    );
  }
}

export default SideNav;
