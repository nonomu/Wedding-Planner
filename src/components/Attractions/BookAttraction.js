import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import CloseIcon from '@material-ui/icons/Close'
import { Fab, TextField } from '@material-ui/core'
import { Link } from 'react-router-dom'
import DoneIcon from '@material-ui/icons/Done'
@inject('attractions', 'user')
@observer
class BookAttraction extends Component {
	constructor() {
		super()
		this.state = {
			attractionData: [],
			price: 0
		}
	}

	handleInput = e => {
		this.setState({ price: e.target.value })
	}
	bookButton = () => {
		this.props.user.bookAttraction(
			this.props.user.userInfo.id,
			this.state.attractionData.id,
			this.state.price
		)
	}

	componentDidMount = () => {
		let attractionData = this.props.attractions.getAttractionData(
			this.props.category,
			this.props.id
		)
		this.setState({ attractionData })
	}

	render() {
		let attractionData = this.state.attractionData
		return (
			<div>
				{!attractionData ? null : (
					<div className='book-attraction'>
						<Fab className='close' onClick={this.props.history.goBack}>
							<CloseIcon />
						</Fab>
						<h2>Wohooooo You've got a {attractionData.category}!</h2>
						<img
							src='https://www.vippng.com/png/detail/5-50383_emojis-transparent-png-party-emoji-png.png'
							style={{ width: '250px' }}
							alt='happyEmoji'
						/>
						<h4>Another item crossed off the to-do list.</h4>
						<p>
							Let’s log this in your budget. How much did your{' '}
							{attractionData.category} cost?
						</p>

						<TextField
							id='price'
							type='number'
							label='Price'
							placeholder='Enter Price'
							onChange={this.handleInput}
						/>

						<h5>
							If you have any changes or additions, make those changes in your
							Budget Tracker.
							<br />
							Once the wedding is over, we’ll remind you to leave a review<br/>
                            but if you want, you can do that now.
						</h5>

						<Fab
							color='secondary'
							className='submit-price'
							onClick={this.bookButton}
							component={Link}
							to='/overview'>
							<DoneIcon />
						</Fab>
					</div>
				)}
			</div>
		)
	}
}

export default BookAttraction
