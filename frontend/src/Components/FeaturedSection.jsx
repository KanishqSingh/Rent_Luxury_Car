import React from 'react'
import Title from './Title'
import { assets, dummyCarData } from '../assets/assets'
import CarCard from './CarCard'
import { useNavigate } from 'react-router'
import { useAppContext } from '../context/AppContext'

const FeaturedSection = () => {
    const navigate = useNavigate();
    const {cars} = useAppContext();
  return (
    <div className='flex flex-col items-center py-24 px-6 md:px-16 lg:px-24 xl:px-32'>

        <div>

            <Title title='Featured Vehicles' subtitle ='lorem jsnjdskjxckjcjkjkjkjkvkjdnjdvjk ksciik' />

        </div>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18'>
            {
                cars.slice(0,6).map((car)=>(
                    <div key={car._id}>
                        <CarCard car={car} />
                    </div>
                ))
            }

        </div>

        <button className='flex items-center justify-center gap-2 px-6 py-2 border border-black hover:bg-gray-500 rounded-md mt-18 cursor-pointer' onClick={()=>{navigate('/cars'); scrollTo(0,0)}} >Explore All Cars
            <img src={assets.arrow_icon} alt="" />
        </button>
        
    </div>
  )
}

export default FeaturedSection