import React, { useState } from 'react';
import { assets, cityList } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const Hero = () => {
  const [pickupLocation, setPickupLocation] = useState('');
  const { navigate, pickupDate, setPickupDate, returnDate, setReturnDate } = useAppContext();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      `/cars?pickupLocation=${pickupLocation}&pickupDate=${pickupDate}&returnDate=${returnDate}`
    );
  };


  return (
    <div className="min-h-screen bg-light flex flex-col items-center justify-center px-4 py-10 md:py-20 text-center gap-12">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">
        Luxury Cars on Rent
      </h1>

      <form onSubmit={handleSearch} className="w-full max-w-5xl bg-white shadow-xl rounded-2xl p-6 sm:p-8 flex flex-col gap-6 md:flex-row md:items-end justify-between">

        {/* Pickup Location */}
        <div className="flex flex-col gap-2 w-full md:w-1/4 min-h-[90px]">
          <label htmlFor="pickup-location" className="text-sm font-medium text-gray-600">
            Pickup Location
          </label>
          <select
            id="pickup-location"
            required
            value={pickupLocation}
            onChange={(e) => setPickupLocation(e.target.value)}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="">Select City</option>
            {cityList.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
          {/* This paragraph will not break the alignment due to fixed height */}
          <p className="text-xs text-gray-500 h-4">
            {pickupLocation ? `Selected: ${pickupLocation}` : ' '}
          </p>
        </div>

        {/* Pickup Date */}
        <div className="flex flex-col gap-2 w-full md:w-1/4 min-h-[90px]">
          <label htmlFor="pickup-date" className="text-sm font-medium text-gray-600">
            Pickup Date
          </label>
          <input value={pickupDate}
            onChange={e => setPickupDate(e.target.value)}
            type="date"
            id="pickup-date"
            min={new Date().toISOString().split('T')[0]}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Return Date */}
        <div className="flex flex-col gap-2 w-full md:w-1/4 min-h-[90px]">
          <label htmlFor="return-date" className="text-sm font-medium text-gray-600">
            Return Date
          </label>
          <input value={returnDate}
            onChange={e => setReturnDate(e.target.value)}
            type="date"
            id="return-date"
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        {/* Search Button */}
        <div className="w-full md:w-auto min-h-[90px] flex justify-center md:justify-end items-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-semibold rounded-full transition duration-200"
          >
            <img src={assets.search_icon} alt="search" className="w-4 h-4 filter brightness-200" />
            Search
          </button>
        </div>

      </form>


      <img
        src={assets.main_car}
        alt="Main Car"
        className="w-full max-w-3xl object-contain mt-4"
      />
    </div>
  );
};

export default Hero;
