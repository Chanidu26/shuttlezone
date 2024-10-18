import React from 'react'
import ServiceList from '../components/Services/ServiceList'

const Services = () => {
  return (
    <section className='pt-5'>
      <div className='container'>
        <div className='xl:w-[470px] mx-auto'>
          <h2 className='heading text-center '>
            Services
          </h2>
          <p className='text_para text-center'>
            Our system offers unmatched Below Services
          </p>
        </div>

        <ServiceList/>
      </div>
    </section>
  )
}

export default Services