"use client"
import Link from "next/link";
import React, { useEffect, useState } from 'react';
import readData from '../../lib/firebase/read/readData';
import { Hotel } from '@/models/Hotel';

const HotelList: React.FC = () => {
    const [hotels, setHotels] = useState<Hotel[]>([]);


// fetch hotels
    useEffect(() => {
        const fetchHotels = async () => {
            const hotelsData = await readData();
            setHotels(hotelsData);
        };
        fetchHotels();
    }, []);

    return (
        
        <section className="w-full h-screen">
        <div className="container mx-auto h-full py-10">
          <div className="flex items-center justify-between py-4">
            <h1 className="text-2xl font-bold tracking-wide">All Hotels List</h1>
            <Link
              href={"/hotels/addNewHotel"}
              className="p-2 px-4 bg-green-100 text-green-800 font-medium tracking-wide rounded"
            >
              Add New Hotel
            </Link>
          </div>
          <div className="container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hotels.map(hotel => (
            <div key={hotel.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative h-48">
                    <img className="absolute inset-0 w-full h-full object-cover" src={hotel.hotelImageUrl} alt={hotel.hotelName} />
                </div>
                <div className="p-4">
                    <div className="text-lg font-semibold text-gray-800 mb-2">{hotel.hotelName}</div>
                    <p className="text-gray-600"><strong>City:</strong> {hotel.hotelCity}</p>
                    <p className="text-gray-600"><strong>Address:</strong> {hotel.hotelAddress}</p>
                    <p className="text-gray-600"><strong>State:</strong> {hotel.hotelState}</p>
                    <p className="text-gray-600"><strong>Pincode:</strong> {hotel.hotelPincode}</p>
                    <p className="text-gray-600"><strong>Email:</strong> {hotel.hotelEmailId}</p>
                    <p className="text-gray-600"><strong>Contact:</strong> {hotel.hotelContactNumber}</p>
                    <p className="text-gray-600"><strong>Rating:</strong> {hotel.hotelStarRating}</p>
                    <a href={`hotels/${hotel.id}`} className="inline-block mt-4 text-blue-500 hover:text-blue-700">Update</a>
                </div>
            </div>
        ))}
    </div>
        </div>
      </section>
       
    );
};

export default HotelList;
