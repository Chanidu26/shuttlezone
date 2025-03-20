import React from 'react'
import { useParams } from 'react-router-dom';
const Court_Appointments = () => {
  const { id } = useParams();
  return (
    <div>
        <h1>Court_Appointments {id}</h1>
    </div>
  )
}

export default Court_Appointments