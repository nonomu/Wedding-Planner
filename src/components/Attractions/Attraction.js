import React, { Component } from 'react';
import { observer,inject } from "mobx-react";
@inject("attractions")
@observer
class Attraction extends Component {
render() {
  return 
  ( <div className="attraction-container">
 <h4>This is ATTRACTION (Ori, work on this with the dummy data)</h4>
    </div>)
}
}


export default Attraction
