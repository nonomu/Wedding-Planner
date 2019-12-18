import React, { Component } from "react";
import "./App.css";
import { observer } from "mobx-react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from "./components/navbars/Navbar";
import SideNav from "./components/navbars/SideNav";
import Home from "./components/Home";
import Profile from "./components/User/Profile";
import Favorites from "./components/User/Favorites";
import Overview from "./components/User/Overview";
import Attractions from "./components/Attractions/Attractions";
import BookAttraction from "./components/Attractions/BookAttraction";


@observer
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Navbar />
          <SideNav />
          <h3>GOOD VIBES ONLY</h3>
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/profile" render={() => <Profile />} />
          <Route exact path="/favorites" render={() => <Favorites />} />
          <Route exact path="/overview" render={() => <Overview />} />
          <Route exact path="/attractions/:category" render={({match}) => <Attractions category={match.params.category} />} />
          <Route exact path="/book/:category/:id" render={({match}) => <BookAttraction category={match.params.category} id={match.params.id} />} />

        </Router>
      </div>
    );
  }
}


export default App;
