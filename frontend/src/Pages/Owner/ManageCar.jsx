import React, { useEffect, useState } from 'react';
import { assets, dummyCarData } from '../../assets/assets';
import TitleOwner from '../../Components/Owner/TitleOwner';
import { useAppContext } from '../../context/AppContext';
import toast from 'react-hot-toast';

const ManageCar = () => {

  const { isOwner, axios } = useAppContext();
  const [cars, setCars] = useState([]);

  const fetchOwnerCars = async () => {
    try {
      const { data } = await axios.get('/api/owner/cars')
      if (data.success) {
        console.log('data',data);
        console.log('isAvailable car =',data.cars[0].isAvailable);
        
        setCars(data.cars)
        
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };
  const toggleAvailability = async (carId) => {
    try {
      const { data } = await axios.post('/api/owner/toggle-car', { carId })
      if (data.success) {
        toast.success(data.message)
        fetchOwnerCars();
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  const deleteCar = async (carId) => {
    try {

      const confirm = window.confirm('Are you sure you want to delete this car')

      if (!confirm) return null;

      const { data } = await axios.post('/api/owner/delete-car', { carId })
      if (data.success) {
        toast.success(data.message)
        fetchOwnerCars();
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  useEffect(() => {
    isOwner && fetchOwnerCars();
  }, [isOwner]);

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
                    className={`px-2 py-1 text-xs font-medium rounded-full ${car.isAvailable ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                      }`}
                  >
                    {car.isAvailable ? 'Available' : 'Unavailable'}
                  </span>
                </td>

                <td className="p-4 flex items-center gap-3">

                  <img
                    src={car.isAvailable ? assets.eye_close_icon : assets.eye_icon}
                    alt="action"
                    className="w-8 h-8"
                    onClick={() => toggleAvailability(car._id)}
                  />


                  <img
                    src={assets.delete_icon}
                    alt="delete"
                    className="w-8 h-8"
                    onClick={() => deleteCar(car._id)}
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
