import React, { Component } from 'react';
import Attraction from './Attraction';

class Attractions extends Component {
render() {
return <div>
    <h1>Attractions Page</h1>
    this page should print here the route match
    <div>
    {this.props.category}
    </div>



    <Attraction />
    <Attraction />
    </div>
}
}


export default Attractions