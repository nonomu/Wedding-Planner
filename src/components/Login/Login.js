import React, { useState, useEffect, useContext } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import { toast as popup } from 'react-toastify'
import { observer } from 'mobx-react'
import { handleError } from '../../helpers/validator'
import { Link } from 'react-router-dom'
import classes from './login.module.css'
import Dialog from '../UI/Dialog/Dialog'
import { AuthContext } from '../../stores/Auth'

const Login = ({ history, match }) => {
		const [email, setEmail] = useState('')
		const [password, setPassword] = useState('')
		const auth = useContext(AuthContext)

		const login = async () => {
			try {
				const loginData = { email, password }
				handleError(loginData)
				const login = await auth.login(loginData)
				popup.success(login)
				history.push('/')
			} catch (err) {
				popup.error(err.message)
			}
		}

		useEffect(() => {
			const url = match.url
			auth.setURL(url)
		}, [auth, match.url])

		return (
			<Dialog>
				<h1>Login</h1>
				<div>
					<TextField
						name='email'
						label='Email'
						type='email'
						onChange={({ target }) => setEmail(target.value)}
					/>
				</div>
				<div>
					<TextField
						name='password'
						label='Password'
						type='password'
						onChange={({ target }) => setPassword(target.value)}
					/>
				</div>
				<div className={classes.LoginBottom}>
					<p className={classes.CreateAccount}>
						Don't have an account yet?
						<Link to='/register'>
							<span className={classes.Link}> Create one here!</span>
						</Link>
					</p>
				</div>
				<Button variant='contained' color='primary' onClick={login}>
					LOGIN
				</Button>
			</Dialog>
		)
	}

export default observer(Login)
