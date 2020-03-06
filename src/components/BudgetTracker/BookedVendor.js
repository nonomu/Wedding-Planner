import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import CardMedia from '@material-ui/core/CardMedia'
import './paper.css'
import PhoneIcon from '@material-ui/icons/Phone'
import AlternateEmailSharpIcon from '@material-ui/icons/AlternateEmailSharp'
import PaymentSharpIcon from '@material-ui/icons/PaymentSharp'

const useStyles = makeStyles(theme => ({
	root: {
		padding: theme.spacing(2, 1)
	},
	media: {
		height: '30vh',
		width: '60%'
	}
}))
export default function BookedVendor({ vendor }) {
	const classes = useStyles()
	return (
		<CardMedia
			id='cardMedia'
			className={classes.media}
			image={vendor.image}
			title={vendor.name}>
			<Paper className={`${classes.root} bookedAttraction`} id='Paper'>
				<Typography variant='h4' component='h3'>
					Your {vendor.category}
				</Typography>
				<i>{vendor.name}</i>

				<div id='detail-box'>
					<div id='col1'>
						<Typography id='col1' component='p'>
							<PhoneIcon /> <strong>{vendor.contact}</strong>:{vendor.phone}{' '}
							<br />
							<AlternateEmailSharpIcon /> {vendor.email}
						</Typography>
						<Typography component='p'>
							<PaymentSharpIcon /> {vendor.bookedVendor.price}₪
						</Typography>
						<Typography component='p'>Notes: {vendor.small_prints}</Typography>
					</div>
				</div>
			</Paper>
		</CardMedia>
	)
}
