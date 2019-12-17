import React, { Component } from "react";
import { inject } from "mobx-react";



@inject('user')
class Profile extends Component {
  constructor() {
    super();
    this.state = {
      groomName: "",
      brideName: "",
      weddingDate: "",
      estInvitees: 0,
      estBudget: 0,
      estGifts: 0,
      weddingArea: "",
      venueRadius: 0
    };
  }

  handleInputs= e =>{
    e.target.id === "groomName"
    ? this.setState({ groomName: e.target.value })
    : e.target.id === "brideName"
    ? this.setState({ brideName: e.target.value })
    : e.target.id === "weddingDate"
    ? this.setState({ weddingDate: e.target.value })
    : e.target.id === "estInvitees"
    ? this.setState({ estInvitees: e.target.value })
    : e.target.id === "estBudget"
    ? this.setState({ estBudget: e.target.value })
    : e.target.id === "estGifts"
    ? this.setState({ estGifts: e.target.value })
    : e.target.id === "weddingArea"
    ? this.setState({ weddingArea: e.target.value })
    : e.target.id === "venueRadius"
    ? this.setState({ venueRadius: e.target.value })
    : console.log("Problema");
  }
updateUserProfile=()=>{
    this.props.user.updateUserProfile(this.state)
}

  render() {
    return (
      <div id="profile-container">
        <h1>User Profile</h1>
        <p>
          You need to insert the details about the user and the wedding so we
          can help you to plan your wedding easily.
        </p>
        <hr />
        <h3>Personal Details:</h3>
        <div>
          <input id="groomName" value={this.state.groomName} type="text" placeholder="Groom Full Name" onChange={this.handleInputs} />
        </div>
        <div>
          <input id="brideName" value={this.state.brideName} type="text" placeholder="Bride Full Name" onChange={this.handleInputs} />
        </div>
        <h3>Wedding Details:</h3>
        <div>
          <input id="weddingDate" value={this.state.weddingDate} type="date" onChange={this.handleInputs} />
        </div>
        <div>
          <input id="estInvitees" type="number" placeholder="Invitees" onChange={this.handleInputs} />
          <input id="estBudget" type="number" placeholder="Budget" onChange={this.handleInputs} />
          <input id="estGifts" type="number" placeholder="Gifts" onChange={this.handleInputs} />
        </div>
        <div>
          <input id="venueRadius" type="number" placeholder="Venue Radius(in KM)" onChange={this.handleInputs} />
          <select id="weddingArea" onChange={this.handleInputs}>
            <option className="location" selected disabled>
              Select Location
            </option>
            <option class="location" value="North">
              North
            </option>
            <option class="location" value="West">
              West
            </option>
            <option class="location" value="Center">
              Center
            </option>
            <option class="location" value="South">
              South
            </option>
          </select>
          {/* ^^^ Make this select options ??? ^^^ */}
        </div>
        <button onClick={this.updateUserProfile}>UPDATE PROFILE</button>
      </div>
    );
  }
}

export default Profile;
