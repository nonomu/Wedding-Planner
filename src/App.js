import React, { Component } from "react";
import "./App.css";
import { observer } from "mobx-react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/navbars/Navbar";
import SideNav from "./components/navbars/SideNav";

@observer
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Navbar />
          <SideNav />
          Hello Teamates
        </Router>
      </div>
    );
  }
}

export default App;
