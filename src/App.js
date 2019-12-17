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

@observer
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Navbar />
          <SideNav />
          Hello Teamates
          <Route exact path="/" render={() => <Home />} />
          <Route exact path="/profile" render={() => <Profile />} />
          <Route exact path="/favorites" render={() => <Favorites />} />
          <Route exact path="/overview" render={() => <Overview />} />
          <Route path="/attractions/:category" render={({match}) => <Attractions category={match.params.category} />} />

        </Router>
      </div>
    );
  }
}

export default App;
