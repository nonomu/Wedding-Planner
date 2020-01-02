import React, { Component } from 'react'
import { observer, inject } from 'mobx-react'
import CloseIcon from '@material-ui/icons/Close'
import { Fab, TextField } from '@material-ui/core'
import { Link } from 'react-router-dom'
import DoneIcon from '@material-ui/icons/Done'
@inject('attractions', 'user')
@observer
class BookVendor extends Component {
	bookButton = () => {
		let attractionData = this.props.attractions.getAttractionData(this.props.category,this.props.id)
		let price=document.getElementById('price').value ?parseInt(document.getElementById('price').value): 0
		this.props.user.bookAttraction(
			this.props.user.userInfo.id,
			attractionData.id,
			price
		)
	}
	render() {
		let attractionData = this.props.attractions.getAttractionData(
			this.props.category,
			this.props.id
		)
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
							style={{ width: '150px' }}
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

export default BookVendor
