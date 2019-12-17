import React, { Component } from 'react';
import Attraction from './Attraction';
import { observer, inject } from "mobx-react";
@inject("attractions")
@observer
class Attractions extends Component {
render() {
    let venue = this.props.attractions.venue

return <div>
    <h1>Attractions Page</h1>
    this page should print here the route match

    
    <Attraction 
 />
    <Attraction />
    </div>
}
}


export default Attractions