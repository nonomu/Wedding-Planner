import React from 'react'
import Button from '@material-ui/core/Button'

export default function CustomButton(props) {
	return (
		<Button
			variant='contained'
			className={props.className}
			color={props.color || 'secondary'}
			onClick={props.onClick}>
			{props.children}
		</Button>
	)
}
