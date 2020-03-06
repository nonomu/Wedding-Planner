import React, { useContext, useEffect } from 'react'
import { observer } from 'mobx-react'
import Dialog from '../UI/Dialog/Dialog'
import PhoneIcon from '@material-ui/icons/Phone'
import { Typography } from '@material-ui/core'
import LocationOnIcon from '@material-ui/icons/LocationOn'
import AlternateEmailSharpIcon from '@material-ui/icons/AlternateEmailSharp'
import Rating from '@material-ui/lab/Rating'
import { VendorsContext } from '../../stores/Vendors'

const VendorInfo = ({ match }) => {
	const vendors = useContext(VendorsContext)
	const id = parseInt(match.params.id)
	const vendorsData = vendors.vendors
	const vendor = vendorsData.length && vendorsData.find(v => v.id === id)
	useEffect(() => {
		if (!vendors.vendors.length) {
			vendors.getVendors()
		}
	}, [vendors])

	return (
		<Dialog>
			<div className='attraction-info-title'>
				<h3>{vendor.name}</h3>
				<h4>
					<i>{vendor.category}</i>
				</h4>
			</div>
			<img src={vendor.image} alt={vendor.name} width='500px' height='300px' />
			<Typography className='attraction-info-bottom'>
				<strong>
					<PhoneIcon /> {vendor.contact}: {vendor.phone}
				</strong>
				<br />
				<strong>
					<AlternateEmailSharpIcon /> {vendor.email}
				</strong>
				<br />
				<strong>
					<LocationOnIcon /> {vendor.location}
				</strong>
				<br />
				<Rating value={vendor.rating || 0} readOnly /> <br />
			</Typography>
			<h5>notes: {vendor.small_prints}</h5>
		</Dialog>
	)
}

export default observer(VendorInfo)
