import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import Autocomplete from 'react-google-autocomplete';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import brideAndGroom from './brideAndGroom.png'
import './profile.css'
import {toast as popup} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

@inject('user')
@observer
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
  componentDidMount = async () => {
    await this.props.user.getWeddingDetails()
    let userInfo = this.props.user.userInfo.weddingData
    this.setState({
      groomName: userInfo.groom_name,
      brideName: userInfo.bride_name,
      weddingDate: userInfo.wedding_date,
      estInvitees: userInfo.est_invitees,
      estBudget: userInfo.est_budget,
      estGifts: userInfo.est_cash_gifts,
      weddingArea: userInfo.wedding_area
    })
  }

  handleInputs = e => {
    this.setState({ [e.target.name]: e.target.value })
  }
  updateUserInfo = async () => {
  try {
    let update = await this.props.user.updateUserInfo(this.state)
    popup.success(update)
  }
    catch(err) {
      popup.error(err.message)
    }
  }
  render() {
    
    return (
      <div id="profile-container">
        <div className="sideForm">
          <h1>User Profile</h1>
          <div className="upperText">
            You need to insert the details about the user and the wedding so we
            can help you to plan your wedding easily.
        </div>
          <hr />
          <img src={brideAndGroom} id="groomAndBride" alt="Logo" />

          <h3>Personal Details:</h3>
          <span>
            <TextField name="brideName" label="Bride" variant="outlined" value={this.state.brideName} type="text" placeholder="Bride Full Name" onChange={this.handleInputs} />
          </span>
          <span>
            <TextField name="groomName" label="Groom" variant="outlined" value={this.state.groomName} type="text" placeholder="Groom Full Name" onChange={this.handleInputs} />
          </span>
          <h3>Wedding Details:</h3>
          <div>
            <TextField name="weddingDate" label="Wedding Date" variant="outlined" value={this.state.weddingDate} type="date" onChange={this.handleInputs} />
          </div>
          <div>
            <br></br>
            <TextField name="estInvitees" label="Estimated Invitees" variant="outlined" value={this.state.estInvitees} type="number" placeholder="Estimated Invitees" onChange={this.handleInputs} />
            <br></br><br></br>
            <TextField name="estBudget" id="estBudget" label="Estimated Budget" variant="outlined" value={this.state.estBudget} type="number" placeholder="Estimated Budget" onChange={this.handleInputs} />
          </div>
          <div>
            <Autocomplete value={this.state.weddingArea} name="weddingArea" id="autoCompleteField"
              style={{ width: '220px', backgroundColor: "rgba( 255,255 ,255,0 )", height: 50, borderRadius: 4, borderColor: 'rgba(0,0,0,0.3)' }}
              onChange={this.handleInputs}
              onPlaceSelected={(city) => {
                let cityName = city.formatted_address
                this.setState({ weddingArea: cityName })
              }}
              types={['(cities)']}
              componentRestrictions={{ country: "IL" }}
            />

          </div>
          <Button variant="contained" color="secondary" onClick={this.updateUserInfo}>UPDATE PROFILE</Button>
        </div>
      </div>
    );
  }
}

export default Profile;
