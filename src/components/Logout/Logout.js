import React from 'react'
import {inject, observer} from 'mobx-react'
import {Redirect} from 'react-router-dom'

const Logout = inject('auth')(observer(({auth}) => {
  auth.setURL('/')
  auth.logOut()
  return <Redirect to='/' />
}))

export default Logout