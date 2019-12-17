import React, { Component } from 'react';
import { Link } from "react-router-dom";
class Navbar extends Component {
render() {
return <div id="navbar">
    <Link to="/">
    Home
</Link>
<Link to="/profile">
    Profile
</Link>
<Link to="/favorites">
    Favorites
</Link>

<Link to="/overview">
    OverView
</Link>

</div>
}
}


export default Navbar