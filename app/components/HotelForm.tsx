import React, { useState } from 'react';
import { HotelDetails } from '../../lib/classes/hotelDetails';

type HotelFormProps = {
  onSubmit: (hotelData: HotelDetails) => Promise<void>;
  initialData?: HotelDetails;
};

const HotelForm: React.FC<HotelFormProps> = ({ onSubmit, initialData }) => {
  const [hotelData, setHotelData] = useState<HotelDetails>(initialData || new HotelDetails());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setHotelData({ ...hotelData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit(hotelData);
  };

  const handleReset = () => {
    setHotelData(initialData || new HotelDetails());
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-md space-y-4">
    <div>
      <label htmlFor="hotelName" className="block text-sm font-medium text-gray-700">
        Hotel Name
      </label>
      <input
        id="hotelName"
        name="hotelName"
        value={hotelData.hotelName}
        onChange={handleChange}
        placeholder="Hotel Name"
        required
        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label htmlFor="hotelEmailId" className="block text-sm font-medium text-gray-700">
        Hotel Email
      </label>
      <input
        id="hotelEmailId"
        name="hotelEmailId"
        value={hotelData.hotelEmailId}
        onChange={handleChange}
        placeholder="Hotel Email"
        required
        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label htmlFor="hotelContactNumber" className="block text-sm font-medium text-gray-700">
        Contact Number
      </label>
      <input
        id="hotelContactNumber"
        name="hotelContactNumber"
        type="number"
        value={hotelData.hotelContactNumber}
        onChange={handleChange}
        placeholder="Contact Number"
        required
        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label htmlFor="hotelStarRating" className="block text-sm font-medium text-gray-700">
        Star Rating
      </label>
      <input
        id="hotelStarRating"
        name="hotelStarRating"
        type="number"
        value={hotelData.hotelStarRating}
        onChange={handleChange}
        placeholder="Star Rating"
        required
        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
   
    <div>
      <label htmlFor="hotelAddress" className="block text-sm font-medium text-gray-700">
        Address
      </label>
      <input
        id="hotelAddress"
        name="hotelAddress"
        value={hotelData.hotelAddress}
        onChange={handleChange}
        placeholder="Address"
        required
        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label htmlFor="hotelState" className="block text-sm font-medium text-gray-700">
        State
      </label>
      <input
        id="hotelState"
        name="hotelState"
        value={hotelData.hotelState}
        onChange={handleChange}
        placeholder="State"
        required
        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label htmlFor="hotelCity" className="block text-sm font-medium text-gray-700">
        City
      </label>
      <input
        id="hotelCity"
        name="hotelCity"
        value={hotelData.hotelCity}
        onChange={handleChange}
        placeholder="City"
        required
        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label htmlFor="hotelPincode" className="block text-sm font-medium text-gray-700">
        Pincode
      </label>
      <input
        id="hotelPincode"
        name="hotelPincode"
        value={hotelData.hotelPincode}
        onChange={handleChange}
        placeholder="Pincode"
        required
        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div>
      <label htmlFor="hotelImageUrl" className="block text-sm font-medium text-gray-700">
        Image URL
      </label>
      <input
        id="hotelImageUrl"
        name="hotelImageUrl"
        value={hotelData.hotelImageUrl}
        onChange={handleChange}
        placeholder="Image URL"
        required
        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
    <div className="flex justify-between">
      <button
        type="submit"
        className="w-full px-4 py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit
      </button>
      <button
        type="button"
        onClick={handleReset}
        className="w-full ml-2 px-4 py-2 bg-gray-500 text-white font-semibold rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
      >
        Cancel
      </button>
    </div>
  </form>
  );
};

export default HotelForm;
