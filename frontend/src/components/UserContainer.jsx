import React from 'react'
import Login from './Login'
import Register from './Register'

export const UserContainer = () => {
  return (
    <div className='user'>
        <h1>Login</h1>
        <Login/>
        <h1>Register</h1>
        <Register/>
    </div>
  )
}
