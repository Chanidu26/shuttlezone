import React, { useState } from 'react'
import CourtCard from './CourtCard'
const Court = () => {
  const [courts,setCourts] = useState([])
  return (
    <>
    <section className='pt-5'>
      <div className='container text-center'>
        <h2 className='heading'>Find a court</h2>
        <div className='max-w-[570px] mt-[30px] mx-auto bg-slate-200 rounded-md flex items-center justify-between'>
          <input
            type="search"
            placeholder="Search for courts"
            className="w-full py-4 pl-4 pr-2 text-white bg-transparent focus:outline-none
            cursor-pointer placeholder: text-black "
          />
          <button className='btn mt-0 rounded-[0px] rounded-r-md'>Search</button>
        </div>
      </div>
    </section>
    <section>
      <div className='container'>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>
           {courts.map(court => {
            <CourtCard />
           })}
        </div>
      </div>
    </section>
    </>
  )
}

export default Court