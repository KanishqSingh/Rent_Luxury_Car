import React, { useEffect, useState } from 'react';
import { assets, dummyCarData } from '../../assets/assets';
import TitleOwner from '../../Components/Owner/TitleOwner';

const ManageCar = () => {
  const [cars, setCars] = useState([]);

  const fetchOwnerCars = async () => {
    setCars(dummyCarData);
  };

  useEffect(() => {
    fetchOwnerCars();
  }, []);

  return (
    <div className="px-4 pt-10 md:px-10 w-full">
      <TitleOwner title="Manage Cars" />

      <div className="max-w-5xl w-full overflow-x-auto mt-6 border border-gray-300 rounded-lg shadow-sm">
        <table className="w-full border-collapse text-left text-sm min-w-[600px]">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 font-medium text-gray-600">Car</th>
              <th className="p-4 font-medium text-gray-600 max-md:hidden">Category</th>
              <th className="p-4 font-medium text-gray-600">Price</th>
              <th className="p-4 font-medium text-gray-600 max-md:hidden">Status</th>
              <th className="p-4 font-medium text-gray-600">Actions</th>
            </tr>
          </thead>

          <tbody>
            {cars.map((car, index) => (
              <tr
                key={index}
                className="border-t hover:bg-gray-50 transition-colors duration-200"
              >
                <td className="p-4 flex items-center gap-4">
                  <img
                    src={car.image}
                    alt="car"
                    className="w-16 h-12 object-cover rounded-md border"
                  />
                  <div>
                    <p className="font-medium">{car.brand} {car.model}</p>
                    <p className="text-xs text-gray-500">
                      {car.seating_capacity} Seater / {car.transmission}
                    </p>
                  </div>
                </td>

                <td className="p-4 max-md:hidden text-gray-700">{car.category}</td>

                <td className="p-4 text-gray-800 font-semibold">
                  ${car.pricePerDay}/day
                </td>

                <td className="p-4 max-md:hidden">
                  <span
                    className={`px-2 py-1 text-xs font-medium rounded-full ${
                      car.isAvaliable ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {car.isAvaliable ? 'Available' : 'Unavailable'}
                  </span>
                </td>

                <td className="p-4 flex items-center gap-3">
                 
                    <img
                      src={car.isAvaliable ? assets.eye_close_icon : assets.eye_icon}
                      alt="action"
                      className="w-8 h-8"
                    />
                  
                  
                    <img
                      src={assets.delete_icon}
                      alt="delete"
                      className="w-8 h-8"
                    />
                  
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageCar;
