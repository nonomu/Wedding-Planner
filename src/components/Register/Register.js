import React, { useState, useContext } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '../UI/Button/Button'
import { toast as popup } from 'react-toastify'
import { observer } from 'mobx-react'
import Autocomplete from '../UI/Autocomplete/Autocomplete'
import classes from './register.module.css'
import Dialog from '../UI/Dialog/Dialog'
import { handleError, validatePassword } from '../../helpers/validator'
import { useEffect } from 'react'
import { AuthContext } from '../../stores/Auth'

const Register = ({ match, history }) => {
	const auth = useContext(AuthContext)

	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [confirmPassword, setConfirmPassword] = useState('')

	const [partner1, setPartner1] = useState('')
	const [partner2, setPartner2] = useState('')
	const [date, setDate] = useState('2020-01-01')
	const [num_of_guests, setNumOfGuests] = useState(0)
	const [budget, setBudget] = useState(0)
	const [preferred_location, setLocation] = useState('')

	const { setURL } = auth
	const { url } = match

	useEffect(() => {
		setURL(url)
		return setURL('/')
	}, [setURL, url, auth.loggedIn])

	const getFormData = () => {
		return {
			partner1,
			partner2,
			date,
			num_of_guests,
			budget,
			preferred_location
		}
	}

	const register = async () => {
		try {
			const user = { email, password }
			handleError(user)

			const wedding = getFormData()
			handleError(wedding)

			validatePassword(password, confirmPassword)
			let register = await auth.register(user, wedding)
			popup.success(register)
			history.push('/')
		} catch (err) {
			popup.error(err.message)
		}
	}

	return (
		<Dialog>
			<div className={classes.Register}>
				<h1>Register</h1>
				<TextField
					name='email'
					label='Email'
					onChange={({ target }) => setEmail(target.value)}
				/>
				<TextField
					name='password'
					label='Password'
					type='password'
					onChange={({ target }) => setPassword(target.value)}
				/>
				<TextField
					name='confirmPassword'
					label='Confirm Password'
					type='password'
					onChange={({ target }) => setConfirmPassword(target.value)}
				/>
				<hr />
				<h2>Wedding Details</h2>
				<span className={classes.TextField}>
					<TextField
						name='partner1'
						label='Partner 1'
						onChange={({ target }) => setPartner1(target.value)}
					/>
					<span className={classes.TextField}>
						<TextField
							name='partner2'
							label='Partner 2'
							onChange={({ target }) => setPartner2(target.value)}
						/>
					</span>
					<div className={classes.WeddingInputs}>
						<span className={classes.TextField}>
							<TextField
								type='date'
								name='date'
								label='Wedding Date'
								value={date}
								onChange={({ target }) => setDate(target.value)}
							/>
						</span>
						<Autocomplete
							value={preferred_location}
							name='preferred_location'
							onChange={e => setLocation(e.target.value)}
							onSelect={e => setLocation(e.formatted_address)}
						/>
					</div>
					<span className={classes.TextField}>
						<TextField
							type='number'
							name='budget'
							label='Budget(₪)'
							onChange={({ target }) => setBudget(target.value)}
						/>
					</span>
					<TextField
						type='number'
						name='num_of_guests'
						label='Estimated Guests'
						onChange={({ target }) => setNumOfGuests(target.value)}
					/>
				</span>
				<Button color='primary' onClick={register}>
					Register
				</Button>
			</div>
		</Dialog>
	)
}

export default observer(Register)
