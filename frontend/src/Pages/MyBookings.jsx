import React, { useState, useEffect } from 'react';
import { assets, dummyMyBookingsData } from '../assets/assets';
import Title from '../Components/Title';

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);

  const fetchMyBookings = async () => {
    setBookings(dummyMyBookingsData);
  };

  useEffect(() => {
    fetchMyBookings();
  }, []);

  return (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 max-w-7xl mx-auto text-sm text-gray-800'>
      <Title
        title='My Bookings'
        subTitle='View and manage all your car bookings'
        align='left'
      />

      <div className='mt-10 space-y-6'>
        {bookings.length > 0 ? (
          bookings.map((booking, index) => (
            <div
              key={booking._id || index}
              className='grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-gray-200 rounded-xl shadow-sm bg-white hover:shadow-md transition-shadow duration-300'
            >
              {/* Car Image */}
              <div className='md:col-span-1'>
                <img
                  src={booking.car.image}
                  alt={`${booking.car.brand} ${booking.car.model}`}
                  className='w-full aspect-video object-cover rounded-lg'
                />
              </div>

              {/* Car Info */}
              <div className='md:col-span-2 flex flex-col justify-between'>
                <div>
                  <h2 className='text-xl font-semibold'>
                    {booking.car.brand} {booking.car.model}
                  </h2>
                  <p className='text-gray-500 mt-1'>
                    {booking.car.year} • {booking.car.category} • {booking.car.location}
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:flex-wrap items-start gap-4 mt-6 text-xs sm:text-sm">
                  {/* Booking status */}
                  <span className='bg-gray-100 text-gray-600 px-3 py-1 rounded-full'>
                    Booking #{index + 1}
                  </span>

                  <span
                    className={`px-3 py-1 rounded-full ${
                      booking.status === 'confirmed'
                        ? 'bg-green-100 text-green-700'
                        : booking.status === 'pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {booking.status}
                  </span>

                  {/* Rental Dates */}
                  <div className='flex items-start gap-2'>
                    <img src={assets.calendar_icon_colored} alt="calendar" className='w-4 h-4 mt-1' />
                    <div>
                      <p className='text-gray-500'>Rental Period</p>
                      <p>{booking.pickupDate.split('T')[0]} to {booking.returnDate.split('T')[0]}</p>
                    </div>
                  </div>

                  {/* Pickup Location */}
                  <div className='flex items-start gap-2'>
                    <img src={assets.location_icon_colored} alt="location" className='w-4 h-4 mt-1' />
                    <div>
                      <p className='text-gray-500'>Pickup Location</p>
                      <p>{booking.car.location}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Price Info */}
              <div className='md:col-span-1 flex flex-col justify-between gap-6 text-right md:text-left'>
                <div>
                  <p className='text-gray-500'>Total Price</p>
                  <h1 className='text-2xl font-semibold text-blue-600'>${booking.price}</h1>
                  <p className='text-sm text-gray-400 mt-2'>
                    Booked on {booking.createdAt.split('T')[0]}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className='text-center text-gray-500 mt-10'>No bookings found.</p>
        )}
      </div>
    </div>
  );
};

export default MyBookings;
