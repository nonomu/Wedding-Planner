import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import Autocomplete from 'react-google-autocomplete';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import brideAndGroom from '../../assets/brideAndGroom.png'
import classes from './profile.module.css'
import {toast as popup} from 'react-toastify'

@inject('wedding', 'auth')
@observer
class Profile extends Component {
  handleInputs = e => {
    const target = e.target
    let value = target.value
    const name = target.name
    this.props.wedding.handleInput(name, value)
  }
  updateUserInfo = async () => {
  try {
    let update = await this.props.wedding.updateUserInfo()
    popup.success(update)
  }
    catch(err) {
      popup.error(err.message)
    }
  }

  componentDidMount() {
    this.props.wedding.getWeddingDetails(this.props.auth.id)
  }



  render() {
    let weddingData = this.props.wedding.weddingData
    return (
      <div className={classes.Profile}>
          <h1>Profile</h1>
          <p className={classes.Description}>
          Please keep the information here up to date so your wedding planning will stay on-course.
        </p>
          <hr />
          <img src={brideAndGroom} alt="Logo" />

          <h3>Personal Details:</h3>
            <div className={classes.Names}>
            <TextField name="bride_name" label="Partner 1" variant="outlined" value={weddingData.bride_name} type="text" placeholder="Bride Full Name" onChange={this.handleInputs} />
            <TextField name="groom_name" label="Partner 2" variant="outlined" value={weddingData.groom_name} type="text" placeholder="Groom Full Name" onChange={this.handleInputs} />
            </div>
          <h3>Wedding Details:</h3>
            <div className={classes.Details}>
            <TextField name="wedding_date" label="Wedding Date" variant="outlined" value={weddingData.wedding_date} type="date" onChange={this.handleInputs} />
            <TextField name="est_invitees" label="Estimated Guests" variant="outlined" value={weddingData.est_invitees} type="number" placeholder="Estimated Invitees" onChange={this.handleInputs} />
            <TextField name="est_budget" id="estBudget" label="Estimated Budget(₪)" variant="outlined" value={weddingData.est_budget} type="number" placeholder="Estimated Budget" onChange={this.handleInputs} />
            <Autocomplete className={classes.Location} value={weddingData.wedding_area} name="wedding_area" id="autoCompleteField"
              onChange={this.handleInputs}
              onPlaceSelected={(city) => {
                let cityName = city.formatted_address
                this.setState({ weddingArea: cityName })
              }}
              types={['(cities)']}
              componentRestrictions={{ country: "IL" }}
            />
            </div>
          <div className={classes.Update}>
          <Button variant="contained" className={classes.Update} color="secondary" onClick={this.updateUserInfo}>UPDATE PROFILE</Button>
          </div>
      </div>
    );
  }
}

export default Profile;
