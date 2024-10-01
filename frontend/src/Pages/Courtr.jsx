import React from 'react'
import './Passwordreset.css'
import Nav from  '../components/Nav'
import './Courtr.css'
const Courtr=() => {
  return (
    <div className='fullcontainer'>
      <Nav/>
      <div className='container'>
        
        <div className='header'>Court Registeration</div>
        <div className='details'>
        <div className='onedetail'>
          <div className='filling'>Court Name </div>
          <input type='courtname'/>
        </div>

        <div className='onedetail'>
          <div className='filling'>Address </div>
          <input type='address'/>
        </div>
        <div className='onedetail'>
          <div className='filling'>Distric </div>
          <input type='distric'/>
        </div>
        

        <div className='onedetail'>
          <div className='filling'>Open Days </div>
          <div className='threeinone'>
            <input type='from' className='type2'/>
            <span>to</span>
            <input type='to' className='type2'/>
          </div>
        </div>



        <div className='onedetail'>
          <div className='filling'>Facilities(no of washrooms,no of courts...) </div>
          <input type='box1'/>
        </div>

      
        

        </div>
        <div className='button'><div className='text'>Submit</div></div>
      </div>

    </div>
  )
}

export default Courtr