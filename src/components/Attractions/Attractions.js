import React, { Component } from "react";
import Attraction from "./Attraction";
import { observer, inject } from "mobx-react";
import BookAttraction from "./BookAttraction";
@inject("attractions")
@observer
class Attractions extends Component {
  componentDidMount() {
    this.props.attractions.getAttractionsByCategory(this.props.category);
  }

  render() {
    let category = this.props.category;
    let attrArr = this.props.attractions._attractions[category];
    return (
      <div>
        <h1>Attractions Page</h1>
        this page should print here the route match
        <div className="small-attr">
          {attrArr.map(a => (
            <Attraction attr={a} />
          ))}
        </div>
      </div>
    );
  }
}

export default Attractions;
