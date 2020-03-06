import React, { useEffect, useContext } from 'react'
import { observer } from 'mobx-react'
import Autocomplete from 'react-google-autocomplete'
import Button from '../UI/Button/Button'
import TextField from '../UI/TextField/TextField'
import brideAndGroom from '../../assets/brideAndGroom.png'
import classes from './profile.module.css'
import { toast as popup } from 'react-toastify'
import { AuthContext } from '../../stores/Auth'
import { WeddingContext } from '../../stores/Wedding'

const Profile = ({ match }) => {
		const auth = useContext(AuthContext)
		const wedding = useContext(WeddingContext)
    const handleInputs = ({ target }) => {
			const value = target.value
			const name = target.name
			wedding.handleInput(name, value)
		}

		const updateWeddingInfo = async () => {
			wedding
				.updateWeddingInfo()
				.then(update => popup.success(update))
				.catch(err => popup.error(err.message))
    }
    
    useEffect(() => {
      const url = match.url
      auth.setURL(url)
      wedding.getWeddingDetails(auth.id)
    }, [auth, wedding, match.url])

    const data = wedding.wedding
		return (
			<div className={classes.Profile}>
				<h1>Profile</h1>
				<p className={classes.Description}>
					Please keep the information here up to date so your wedding planning
					will stay on-course.
				</p>
				<hr />
				<img src={brideAndGroom} alt='Logo' />

				<h3>Personal Details:</h3>
				<div className={classes.Names}>
					<TextField
						name='partner1'
						label='Partner 1'
						value={data.partner1}
						onChange={handleInputs}
					/>
					<TextField
						name='partner2'
						label='Partner 2'
						value={data.partner2}
						onChange={handleInputs}
					/>
				</div>
				<h3>Wedding Details:</h3>
				<div className={classes.Details}>
					<TextField
						name='date'
						label='Wedding Date'
						value={data.date}
						type='date'
						onChange={handleInputs}
					/>
					<TextField
						name='num_of_guests'
						label='Estimated Guests'
						value={data.num_of_guests}
						type='number'
						onChange={handleInputs}
					/>
					<TextField
						name='budget'
						label='Budget(₪)'
						value={data.budget}
						type='number'
						onChange={handleInputs}
					/>
					<Autocomplete
						className={classes.Location}
						value={data.preferred_location}
						name='preferred_location'
						id='autoCompleteField'
						onChange={handleInputs}
						onPlaceSelected={({formatted_address}) => {
							wedding.handleInput(
								'preferred_location',
								formatted_address
							)
						}}
						types={['(cities)']}
						componentRestrictions={{ country: 'IL' }}
					/>
				</div>
				<div className={classes.Update}>
					<Button
						className={classes.Update}
						onClick={updateWeddingInfo}>
						UPDATE PROFILE
					</Button>
				</div>
			</div>
		)
	}

export default observer(Profile)
