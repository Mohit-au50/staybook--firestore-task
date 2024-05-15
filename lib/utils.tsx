// add common utility functions here that will be user throughout the project
"use client";

import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/firebaseConfig";
import { addHotelDetailsInFirebaseCollection } from "@/lib/firebase/create/createData";
import { HotelDetails } from "@/lib/classes/hotelDetails";
import Link from "next/link";

export const HotelsData = () => {
  const [hotels, setHotels] = useState([]);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "hotelDetails"));
        const hotelsData :any = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setHotels(hotelsData);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchHotels();
  }, []);
  return <>
  {hotels.map((hotel: any) => (
            <Link
              href={`/hotels/${hotel.hotelSlug}`} // Use hotel id for dynamic routing
              key={hotel.hotelSlug}
              className="relative bg-cover bg-center w-full aspect-video rounded-lg p-4"
              style={{ backgroundImage: `url(${hotel.hotelImageUrl})` }}
            >
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white">
                <h2 className="text-xl font-semibold mb-2">{hotel.hotelName}</h2>
                <div className="flex justify-between">
                  <p className="text-gray-200">{hotel.hotelCity}, {hotel.hotelState}</p>
                </div>
              </div>
            </Link>
          ))}
  </>
};



export const AddNewHotelForm = () => {
  const [formData, setFormData] = useState<HotelDetails>({
    hotelName: "",
    hotelEmailId: "",
    hotelContactNumber: 0,
    hotelStarRating: 0,
    hotelImageUrl: "",
    hotelAddress: "",
    hotelState: "",
    hotelCity: "",
    hotelPincode: "",
    hotelSlug: "",
    hotelImagesList: [],
    createdAt: "",
    updatedAt: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const res = await addHotelDetailsInFirebaseCollection(
      "hotelDetails",
      formData
    );
    if (res.status === "OK") {
      // Handle success
    }
  };

  return (
    <div className="max-w-md mx-auto p-8 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Add New Hotel</h2>
      <input
        type="text"
        name="hotelName"
        value={formData.hotelName}
        onChange={handleInputChange}
        placeholder="Hotel Name"
        className="input-field"
      />
      <input
        type="text"
        name="hotelAddress"
        value={formData.hotelAddress}
        onChange={handleInputChange}
        placeholder="Hotel Address"
        className="input-field"
      />
      <input
        type="text"
        name="hotelCity"
        value={formData.hotelCity}
        onChange={handleInputChange}
        placeholder="Hotel City"
        className="input-field"
      />
      <input
        type="text"
        name="hotelPincode"
        value={formData.hotelPincode}
        onChange={handleInputChange}
        placeholder="Hotel Pincode"
        className="input-field"
      />
      <input
        type="text"
        name="hotelState"
        value={formData.hotelState}
        onChange={handleInputChange}
        placeholder="Hotel State"
        className="input-field"
      />
      <input
        type="number"
        name="hotelContactNumber"
        value={
          formData.hotelContactNumber !== 0
            ? formData.hotelContactNumber.toString()
            : ""
        }
        onChange={handleInputChange}
        placeholder="Hotel Contact Number"
        className="input-field"
      />
      <input
        type="text"
        name="hotelEmailId"
        value={formData.hotelEmailId}
        onChange={handleInputChange}
        placeholder="Email Id"
        className="input-field"
      />
      <input
        type="text"
        name="hotelImageUrl"
        value={formData.hotelImageUrl}
        onChange={handleInputChange}
        placeholder="Hotel ImageUrl"
        className="input-field"
      />
      <input
        type="number"
        name="hotelStarRating"
        value={
          formData.hotelStarRating !== 0
            ? formData.hotelStarRating.toString()
            : ""
        }
        onChange={handleInputChange}
        placeholder="Hotel Star Rating"
        className="input-field"
      />
      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white py-2 px-4 rounded-lg mt-4"
      >
       <Link href={'/hotels'}> Add Hotel</Link>
      </button>
    </div>
  );
};