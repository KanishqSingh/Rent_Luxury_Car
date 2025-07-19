import React, { useState } from 'react'
import TitleOwner from '../../Components/Owner/TitleOwner';
import { assets } from '../../assets/assets';

const AddCar = () => {
    const [image, setImage] = useState(null);
    const [car, setCar] = useState({
        brand: '',
        model: '',
        year: '',
        pricePerDay: '',
        transmission: '',
        fuel_type: '',
        seating_capacity: '',
        location: '',
        description: '',
        category: '',
    });

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        console.log(car);
    };

    return (
        <div className='px-4 py-10 md:px-10 flex-1 bg-gray-50 min-h-screen'>
            <TitleOwner title='Add New Car' subTitle='Add a new car to the list and specify all car details' />

            <form onSubmit={onSubmitHandler} className='mt-8 bg-white shadow-md rounded-xl p-6 md:p-10 max-w-3xl mx-auto space-y-6'>
                {/* Car Image */}
                <div className='flex items-center gap-4'>
                    <label htmlFor="car-image" className='cursor-pointer'>
                        <img
                            src={image ? URL.createObjectURL(image) : assets.upload_icon}
                            alt="car"
                            className='h-20 w-32 object-cover border rounded-md'
                        />
                        <input type="file" accept='image/*' hidden id='car-image' onChange={e => setImage(e.target.files[0])} />
                    </label>
                    <p className='text-sm text-gray-500'>Click image to upload a car photo</p>
                </div>

                {/* Brand & Model */}
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                    <div>
                        <label className='block mb-1 font-medium'>Brand</label>
                        <input type="text" required placeholder='e.g. BMW, Audi'
                            value={car.brand}
                            onChange={e => setCar({ ...car, brand: e.target.value })}
                            className='w-full border rounded-md p-2 focus:outline-blue-500'
                        />
                    </div>
                    <div>
                        <label className='block mb-1 font-medium'>Model</label>
                        <input type="text" required placeholder='e.g. A6, Q7'
                            value={car.model}
                            onChange={e => setCar({ ...car, model: e.target.value })}
                            className='w-full border rounded-md p-2 focus:outline-blue-500'
                        />
                    </div>
                </div>

                {/* Year, Price, Category */}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                    <div>
                        <label className='block mb-1 font-medium'>Year</label>
                        <input type="number" required placeholder='e.g. 2023'
                            value={car.year}
                            onChange={e => setCar({ ...car, year: e.target.value })}
                            className='w-full border rounded-md p-2 focus:outline-blue-500'
                        />
                    </div>
                    <div>
                        <label className='block mb-1 font-medium'>Daily Price ($)</label>
                        <input type="number" required placeholder='e.g. 100'
                            value={car.pricePerDay}
                            onChange={e => setCar({ ...car, pricePerDay: e.target.value })}
                            className='w-full border rounded-md p-2 focus:outline-blue-500'
                        />
                    </div>
                    <div>
                        <label className='block mb-1 font-medium'>Category</label>
                        <select value={car.category}
                            onChange={e => setCar({ ...car, category: e.target.value })}
                            className='w-full border rounded-md p-2 bg-white focus:outline-blue-500'>
                            <option value="">Select</option>
                            <option value='Sedan'>Sedan</option>
                            <option value='SUV'>SUV</option>
                            <option value='Van'>Van</option>
                            <option value='OffRoad'>Off Road</option>
                        </select>
                    </div>
                </div>

                {/* Transmission, Fuel, Seating */}
                <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6'>
                    <div>
                        <label className='block mb-1 font-medium'>Transmission</label>
                        <select value={car.transmission}
                            onChange={e => setCar({ ...car, transmission: e.target.value })}
                            className='w-full border rounded-md p-2 bg-white focus:outline-blue-500'>
                            <option value="">Select</option>
                            <option value='Automatic'>Automatic</option>
                            <option value='Manual'>Manual</option>
                            <option value='Semi-Automatic'>Semi-Automatic</option>
                        </select>
                    </div>
                    <div>
                        <label className='block mb-1 font-medium'>Fuel Type</label>
                        <select value={car.fuel_type}
                            onChange={e => setCar({ ...car, fuel_type: e.target.value })}
                            className='w-full border rounded-md p-2 bg-white focus:outline-blue-500'>
                            <option value="">Select</option>
                            <option value='Petrol'>Petrol</option>
                            <option value='Diesel'>Diesel</option>
                            <option value='Electric'>Electric</option>
                            <option value='CNG'>CNG</option>
                        </select>
                    </div>
                    <div>
                        <label className='block mb-1 font-medium'>Seating Capacity</label>
                        <input type="number" required placeholder='e.g. 5'
                            value={car.seating_capacity}
                            onChange={e => setCar({ ...car, seating_capacity: e.target.value })}
                            className='w-full border rounded-md p-2 focus:outline-blue-500'
                        />
                    </div>
                </div>

                {/* Location */}
                <div>
                    <label className='block mb-1 font-medium'>Location</label>
                    <input type="text" required placeholder='Enter city or region'
                        value={car.location}
                        onChange={e => setCar({ ...car, location: e.target.value })}
                        className='w-full border rounded-md p-2 focus:outline-blue-500'
                    />
                </div>

                {/* Description */}
                <div>
                    <label className='block mb-1 font-medium'>Description</label>
                    <textarea rows={4} required placeholder='Write something about the car...'
                        value={car.description}
                        onChange={e => setCar({ ...car, description: e.target.value })}
                        className='w-full border rounded-md p-2 focus:outline-blue-500 resize-none'
                    />
                </div>

                {/* Submit Button */}
                <button type='submit' className='flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-md hover:bg-blue-700 transition-all duration-200'>
                    <img src={assets.tick_icon} alt="tick" className='h-5 w-5' />
                    List Your Car
                </button>
            </form>
        </div>
    );
}

export default AddCar;
