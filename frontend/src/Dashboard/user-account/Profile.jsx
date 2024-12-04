import React, { useState } from 'react'
import { authContext } from '../../context/AuthContext'
import { useEffect , useContext } from 'react'

const Profile = () => {
  const {user, token} = useContext(authContext)

  return (
    <div> 
      Profile
    </div>
  )
}

export default Profile