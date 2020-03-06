import React, { useContext, useState, useEffect } from 'react'
import { observer } from 'mobx-react'
import { Fab, TextField } from '@material-ui/core'
import Dialog from '../UI/Dialog/Dialog'
import DoneIcon from '@material-ui/icons/Done'
import { toast as popup } from 'react-toastify'
import classes from './BookVendor.module.css'
import { AuthContext } from '../../stores/Auth'
import { loadBookVendorContent } from '../../helpers/vendors'
import { VendorsContext } from '../../stores/Vendors'
import { WeddingContext } from '../../stores/Wedding'

const BookVendor = ({ history, match }) => {
		const auth = useContext(AuthContext)
		const vendors = useContext(VendorsContext)
		const wedding = useContext(WeddingContext)
		const [price, setPrice] = useState('')

		useEffect(() => {
			loadBookVendorContent(vendors, auth, wedding)
		}, [auth, vendors, wedding])

		const Book = async vendorId => {
			try {
				if (!price) {
					throw new Error('Please enter a valid price')
				}
				await wedding.bookVendor(vendorId, price)
				history.push('/budget-tracker')
			} catch (err) {
				popup.error(err.message)
			}
		}

		const category = match.params.category
		const vendorId = match.params.id
		const getVendorData = vendors.getVendorData
		const vendor = vendors._vendors.length
			? getVendorData(category, vendorId)
			: null

		return (
			<Dialog>
				{vendor && (
					<div className={classes.BookVendor}>
						<h2>You've got a {vendor.category}!</h2>
						<img
							src='https://www.vippng.com/png/detail/5-50383_emojis-transparent-png-party-emoji-png.png'
							style={{ width: '150px' }}
							alt='happyEmoji'
						/>
						<h4>Another item crossed off the to-do list.</h4>
						<p>
							Let’s log this in your budget. How much did your {vendor.category}{' '}
							cost?
						</p>

						<TextField
							name='price'
							type='number'
							label='Price'
							onChange={e => setPrice(e.target.value)}
							placeholder='Enter Price'
						/>

						<h5>
							If you have any changes or additions, make those changes in your
							Budget Tracker.
							<br />
							Once the wedding is over, we’ll remind you to leave a review
							<br />
							but if you want, you can do that now.
						</h5>

						<Fab
							color='secondary'
							className='submit-price'
							onClick={() => Book(vendor.id)}>
							<DoneIcon />
						</Fab>
					</div>
				)}
			</Dialog>
		)
	}

export default observer(BookVendor)
