import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { toast as popup } from 'react-toastify'
import { inject, observer } from 'mobx-react'
import Autocomplete from 'react-google-autocomplete'
import classes from './register.module.css'
import Dialog from '../UI/Dialog/Dialog'
import { Redirect } from 'react-router-dom'
import {handleError} from '../../helpers/validator'


const Register = inject('auth')(
	observer(props => {
		const [email, setEmail] = useState('')
		const [password, setPassword] = useState('')
		const [confirmPassword, setConfirmPassword] = useState('')

		const [partner1, setPartner1] = useState('')
		const [partner2, setPartner2] = useState('')
		const [date, setDate] = useState('2020-01-01')
		const [num_of_guests, setNumOfGuests] = useState(0)
		const [budget, setBudget] = useState(0)
		const [preferred_location, setLocation] = useState('')

		const register = async () => {
			try {
				const user = { email, password }
				handleError(user)
				const wedding = {
					partner1,
					partner2,
					date,
					num_of_guests,
					budget,
					preferred_location
				}
				handleError(wedding)
				if (password !== confirmPassword) {
					throw new Error('Password confirmation does not match')
				}
				let register = await props.auth.register(user, wedding)
				popup.success(register)
			} catch (err) {
				popup.error(err.message)
			}
		}

		return (
			<Dialog>
				<div className={classes.Register}>
					<h1>Register</h1>
					<span className={classes.TextField}>
						<TextField
							name='email'
							label='Email'
							onChange={e => setEmail(e.target.value)}
						/>
					</span>
					<span className={classes.TextField}>
						<TextField
							name='password'
							label='Password'
							type='password'
							onChange={e => setPassword(e.target.value)}
						/>
					</span>
					<span className={classes.TextField}>
						<TextField
							name='confirmPassword'
							label='Confirm Password'
							type='password'
							onChange={e => setConfirmPassword(e.target.value)}
						/>
					</span>
					<hr />
					<h3>Wedding Details</h3>
					<span className={classes.TextField}>
						<TextField
							name='partner1'
							label='Partner 1'
							onChange={e => setPartner1(e.target.value)}
						/>
						<span className={classes.TextField}>
							<TextField
								name='partner2'
								label='Partner 2'
								onChange={e => setPartner2(e.target.value)}
							/>
						</span>
						<div className={classes.WeddingInputs}>
							<span className={classes.TextField}>
								<TextField
									type='date'
									name='date'
									label='Wedding Date'
									value={date}
									onChange={e => setDate(e.target.value)}
								/>
							</span>
						</div>
						<span className={classes.TextField}>
							<TextField
								type='number'
								name='budget'
								label='Budget(₪)'
								onChange={e => setBudget(e.target.value)}
							/>
						</span>
						<span className={classes.TextField}>
							<TextField
								type='number'
								name='num_of_guests'
								label='Estimated Guests'
								onChange={e => setNumOfGuests(e.target.value)}
							/>
						</span>
						<span className={classes.TextField}>
							<Autocomplete
								value={preferred_location}
								placeholder='Location'
								name='preferred_location'
								id='autoCompleteField'
								className={classes.Location}
								onChange={e => setLocation(e.target.value)}
								onPlaceSelected={city => {
									let cityName = city.formatted_address
									setLocation(cityName)
								}}
								types={['(cities)']}
								componentRestrictions={{ country: 'IL' }}
							/>
						</span>
					</span>
					<Button
						style={{ marginTop: '5px' }}
						variant='contained'
						color='primary'
						onClick={register}>
						Register
					</Button>
					{props.auth.loggedIn ? <Redirect to='/' /> : null}
				</div>
			</Dialog>
		)
	})
)

export default Register
