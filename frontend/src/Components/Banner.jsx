import React from 'react';
import { assets } from '../assets/assets';

const Banner = () => {
  return (
    <div className="max-w-full bg-blue-900 text-white py-12 px-6 md:px-16 lg:px-24 flex flex-col-reverse md:flex-row items-center justify-between gap-10 border border-8">

      {/* Text Content */}
      <div className="flex-1 text-center md:text-left">
        <h2 className="text-3xl sm:text-4xl font-semibold mb-4">
          Do you own a luxury car?
        </h2>
        <p className="text-sm sm:text-base mb-3 text-gray-200">
          Monetize your car — let it earn when you're not driving. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Similique magni, placeat totam neque dignissimos.
        </p>
        <p className="text-sm sm:text-base mb-6 text-gray-300 max-w-xl">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut, temporibus. Architecto, nesciunt? Reprehendemo minima blanditiis vel consectetur!
        </p>
        <button className="bg-white text-blue-900 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition duration-300">
          List Your Car
        </button>
      </div>

      {/* Car Image */}
      <div className="flex-1 flex justify-center">
        <img
          src={assets.banner_car_image}
          alt="Luxury Car"
          className="w-full max-w-md object-contain"
        />
      </div>

    </div>
  );
};

export default Banner;
