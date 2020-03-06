import React, { useContext } from 'react'
import {observer} from 'mobx-react'
import {Redirect} from 'react-router-dom'
import { AuthContext } from '../../stores/Auth'

const Logout = () => {
  const auth = useContext(AuthContext)
  auth.setURL('/')
  auth.logOut()
  return <Redirect to='/' />
}

export default observer(Logout)