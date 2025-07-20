import React, { useEffect, useState } from 'react';
import { dummyMyBookingsData } from '../../assets/assets';
import TitleOwner from '../../Components/Owner/TitleOwner';

const ManageBooking = () => {
  const [bookings, setBookings] = useState([]);

  const fetchOwnerBookings = async () => {
    setBookings(dummyMyBookingsData);
  };

  useEffect(() => {
    fetchOwnerBookings();
  }, []);

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <TitleOwner title="Manage Bookings" />

      <div className="max-w-5xl w-full overflow-x-auto mt-6 border border-gray-300 rounded-lg shadow-sm">
        <table className="w-full border-collapse text-left text-sm min-w-[700px]">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 font-medium text-gray-600">Car</th>
              <th className="p-4 font-medium text-gray-600 max-md:hidden">Date Range</th>
              <th className="p-4 font-medium text-gray-600">Total</th>
              <th className="p-4 font-medium text-gray-600 max-md:hidden">Payment</th>
              <th className="p-4 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>

          <tbody>
            {bookings.map((booking, index) => (
              <tr
                key={index}
                className="border-t hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="p-4 flex items-center gap-4">
                  <img
                    src={booking.car.image}
                    alt="car"
                    className="w-16 h-12 object-cover rounded-md border"
                  />
                  <p className="font-medium">{booking.car.model}</p>
                </td>

                <td className="p-4 max-md:hidden">
                  <p className="text-sm">
                    {new Date(booking.pickupDate).toLocaleDateString()} &rarr;{" "}
                    {new Date(booking.returnDate).toLocaleDateString()}
                  </p>
                </td>

                <td className="p-4 text-gray-800 font-semibold">
                  ${booking.price}
                </td>

                <td className="p-4 flex items-center gap-2">
                  <button className="bg-red-500 text-white text-xs px-3 py-1 rounded hover:bg-red-600 transition">
                    Offile
                  </button>
                </td>

                <td className="p-4 max-md:hidden">
                  {booking.status === 'pending' ? (
                    <select
                      className="border rounded-md p-1 text-sm"
                      value={booking.status}

                    >
                      <option value="pending">Pending</option>
                      <option value="cancelled">Cancelled</option>
                      <option value="confirmed">Confirmed</option>
                    </select>
                  ) : (
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${booking.status === 'confirmed'
                          ? 'bg-green-100 text-green-700'
                          : booking.status === 'cancelled'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                    >
                      {booking.status}
                    </span>
                  )}
                </td>


              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageBooking;
