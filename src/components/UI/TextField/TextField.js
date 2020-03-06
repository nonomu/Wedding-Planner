import React from 'react'
import TextField from '@material-ui/core/TextField'

export default function customTextField(props) {
	const {name, label, value, type, onChange} = props
	return (
		<TextField
			name={name}
			label={label}
			variant='outlined'
			value={value}
			type={type || 'text'}
			onChange={onChange}
		/>
	)
}
