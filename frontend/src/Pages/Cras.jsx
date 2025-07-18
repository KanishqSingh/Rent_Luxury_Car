import React, { useState } from 'react';
import Title from '../Components/Title';
import { assets, dummyCarData } from '../assets/assets';
import CarCard from '../Components/CarCard';

const Cras = () => {
  const [input, setInput] = useState('');

    const filteredCars = dummyCarData.filter((car) =>
    `${car.brand} ${car.model} ${car.description}`.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div className='bg-gray-100 min-h-screen'>

    
      <div className='flex flex-col items-center py-20 bg-gray-200 max-md:px-4'>
        <Title
          title='Available Cars'
          subTitle='Browse our selection of premium vehicles available for your adventure'
        />

     
        <div className='flex items-center bg-white px-4 mt-6 max-w-xl w-full h-12 rounded-full shadow-md'>
          <img src={assets.search_icon} alt="search" className='w-4 h-4 mr-2 opacity-70' />
          <input
            onChange={(e) => setInput(e.target.value)}
            value={input}
            type="text"
            placeholder='Search by name, model or features'
            className='w-full h-full outline-none text-gray-700 placeholder-gray-400'
          />
          <img src={assets.filter_icon} alt="filter" className='w-4 h-4 ml-2 opacity-70' />
        </div>
      </div>

     
      <div className='px-6 md:px-16 lg:px-24 xl:px-32 pb-20'>
        <p className='text-gray-600 text-sm mb-4'>
          Showing {filteredCars.length} car
        </p>

        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto'>
          {filteredCars.map((car, index) => (
            <CarCard key={index} car={car} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cras;
