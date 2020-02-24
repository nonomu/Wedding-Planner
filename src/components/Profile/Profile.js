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
  updateWeddingInfo = async () => {
  try {
    let update = await this.props.wedding.updateWeddingInfo()
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
    const wedding = this.props.wedding.wedding
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
            <TextField name="partner1" label="Partner 1" variant="outlined" value={wedding.partner1} type="text" placeholder="Bride Full Name" onChange={this.handleInputs} />
            <TextField name="partner2" label="Partner 2" variant="outlined" value={wedding.partner2} type="text" placeholder="Groom Full Name" onChange={this.handleInputs} />
            </div>
          <h3>Wedding Details:</h3>
            <div className={classes.Details}>
            <TextField name="date" label="Wedding Date" variant="outlined" value={wedding.date} type="date" onChange={this.handleInputs} />
            <TextField name="num_of_guests" label="Estimated Guests" variant="outlined" value={wedding.num_of_guests} type="number" placeholder="Estimated Invitees" onChange={this.handleInputs} />
            <TextField name="budget" label="Budget(₪)" variant="outlined" value={wedding.budget} type="number" placeholder="Estimated Budget" onChange={this.handleInputs} />
            <Autocomplete className={classes.Location} value={wedding.preferred_location} name="preferred_location" id="autoCompleteField"
              onChange={this.handleInputs}
              onPlaceSelected={(city) => {
                this.props.wedding.handleInput('preferred_location', city.formatted_address)
              }}
              types={['(cities)']}
              componentRestrictions={{ country: "IL" }}
            />
            </div>
          <div className={classes.Update}>
          <Button variant="contained" className={classes.Update} color="secondary" onClick={this.updateWeddingInfo}>UPDATE PROFILE</Button>
          </div>
      </div>
    );
  }
}

export default Profile;
