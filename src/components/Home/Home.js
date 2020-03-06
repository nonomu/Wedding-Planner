import React, { useEffect, useContext } from 'react'
import welcome from '../../assets/welcome.png'
import classes from './Home.module.css'
import { observer } from 'mobx-react'
import { AuthContext } from '../../stores/Auth'

const Home = ({ match }) => {
	const auth = useContext(AuthContext)	
	useEffect(() => {
			const url = match.url
			auth.setURL(url)
		}, [auth, match.url])

		return (
			<div className={classes.Welcome}>
				<img src={welcome} alt='welcome' />
			</div>
		)
	}

export default observer(Home)
