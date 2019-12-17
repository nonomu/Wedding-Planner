import React, { Component } from "react";
import { Link } from "react-router-dom";

class SideNav extends Component {
  render() {
    return (
      <div id="sideNav">
        <div>
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
        </div>
      </div>
    );
  }
}

export default SideNav;
