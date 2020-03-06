import React from 'react'
import Autocomplete from 'react-google-autocomplete'
import classes from './Autocomplete.module.css'

export default function customAutoComplete(props) {
  return (
    <Autocomplete
								value={props.value}
								placeholder='Location'
								name={props.name}
								className={classes.Autocomplete}
								onChange={props.onChange}
								onPlaceSelected={props.onSelect}
								types={['(cities)']}
								componentRestrictions={{ country: 'IL' }}
							/>
  )
}