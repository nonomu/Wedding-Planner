import React, { Component } from "react";
import Attraction from "./Attraction";
import { observer, inject } from "mobx-react";
@inject("attractions")
@observer
class Attractions extends Component {
  componentDidMount() {
    this.props.attractions.getAttractions();
    this.props.attractions.category = this.props.category
  }
  componentDidUpdate() {
    this.props.attractions.category = this.props.category
  }

  render() {
    let attrArr = this.props.attractions.attractionsByCategory
    return (
      <div>
        <h1>{this.props.category}</h1>
        this page should print here the route match
        <div className="small-attr">
          {attrArr.map(a => (
            <Attraction key={a.id} attr={a} />
          ))}
        </div>
      </div>
    );
  }
}

export default Attractions;
