import React, { Component } from 'react';
import { observer, inject } from "mobx-react";



@inject("attractions", "user")

@observer
class Home extends Component {
    componentDidMount=()=>{
        
    }
render() {
return <div id="welcomeIMG"><img id="welcomeTemp" src="/welcomeTemp.png" alt="welcome"/></div>
}
}


export default Home