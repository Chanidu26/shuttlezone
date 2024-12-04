import React, { useState } from 'react'
import CourtCard from './CourtCard'
const Court = () => {
  const [courts,setCourts] = useState([
    {
      id: 1,
      name: "City Sports Center",
      photo: "https://sportsvenuecalculator.com/wp-content/uploads/2022/11/Sponsor-6.jpg",
      description: "A premium sports center with excellent facilities.",
      price: "$20/hour",
      rating: 4.5
    },
    {
      id: 2,
      name: "Downtown Court",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmEws5q6IMs9zMJ_NCQGJK022KjLe-u9ykYw&s",
      description: "A centrally located court with good amenities.",
      price: "$15/hour",
      rating: 4.0
    },
    {
      id: 3,
      name: "Community Court",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQlSlGDnD4ivaRejFwKHREZbI57Y9nLDSWIA&s",
      description: "Affordable court with basic facilities.",
      price: "$10/hour",
      rating: 3.5
    },
    {
      id: 4,
      name: "City badminton Center",
      photo: "https://content.jdmagicbox.com/comp/indore/f8/0731px731.x731.190830183147.z2f8/catalogue/duke-param-academy-indore-badminton-classes-fjxaulc0b4.jpg?clr=",
      description: "Affordable court with basic facilities.",
      price: "$5/hour",
      rating: 3.5
    },
    {
      id: 5,
      name: "Aluthgama Complex Court",
      photo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQQlSlGDnD4ivaRejFwKHREZbI57Y9nLDSWIA&s",
      description: "Affordable court with basic facilities.",
      price: "$10/hour",
      rating: 3.5
    },
  ])
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
    <section className='pt-0'> 
        <div className='container'>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1'>
            {courts.map(court => (
              <CourtCard key={court.id} court={court} />
            ))}
          </div>
        </div>
    </section>
    </>
  )
}

export default Court