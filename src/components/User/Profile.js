import React, { Component } from "react";
import { inject } from "mobx-react";
import Autocomplete from 'react-google-autocomplete';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


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
      musicStyle: 0
    };
  }

  handleInputs = e => {
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
                  : e.target.id === "musicStyle"
                    ? this.setState({ musicStyle: e.target.value })
                    : console.log("Problema");
  }
  updateUserInfo = () => {
    this.props.user.updateUserInfo(this.state)
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
          <TextField id="groomName" variant="outlined" value={this.state.groomName} type="text" placeholder="Groom Full Name" onChange={this.handleInputs} />
        </div>
        <div>
          <TextField id="brideName" variant="outlined" value={this.state.brideName} type="text" placeholder="Bride Full Name" onChange={this.handleInputs} />
        </div>
        <h3>Wedding Details:</h3>
        <div>
          <TextField id="weddingDate" variant="outlined" value={this.state.weddingDate} type="date" onChange={this.handleInputs} />
        </div>
        <div>
          <TextField id="estInvitees" variant="outlined" type="number" placeholder="Estimated Invitees" onChange={this.handleInputs} />
          <TextField id="estBudget" variant="outlined" type="number" placeholder="Estimated Budget" onChange={this.handleInputs} />
          <TextField id="estGifts" variant="outlined" type="number" placeholder="Estimated Gifts" onChange={this.handleInputs} />
        </div>
        <div>
          <TextField id="venueRadius" variant="outlined" type="number" placeholder="music_Style" onChange={this.handleInputs} />
          <Autocomplete
            style={{ width: '40%' }}
            onPlaceSelected={(city) => {
             let cityName=city.formatted_address
              this.setState({ weddingArea: cityName })
            }}
            types={['(cities)']}
            componentRestrictions={{ country: "IL" }}
          />
        </div>
        <Button variant="contained" color="primary" onClick={this.updateUserInfo}>UPDATE PROFILE</Button>
      </div>
    );
  }
}

export default Profile;
