"use client";

import { useState } from "react";
import { addHotelDetailsInFirebaseCollection } from "@/lib/firebase/create/createData";
import { HotelDetails } from "@/lib/classes/hotelDetails";
import { useRouter } from "next/router";

export default function AddNewHotelPage() {
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

  // const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const hotelSlug = `staybook-hotel-${formData.hotelName}-${formData.hotelCity.toLowerCase()}`;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    // Perform basic data validation here if needed
    const updatedFormData = { ...formData};
    const res = await addHotelDetailsInFirebaseCollection( "hotelDetails",  formData);
    if (res.status === "OK") {
      // Redirect to /hotels page or do something else
      // router.push("/hotels");
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
        value={formData.hotelContactNumber !== 0 ? formData.hotelContactNumber.toString() : ''}
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
        value={formData.hotelStarRating !== 0 ? formData.hotelStarRating.toString() : ''}
        onChange={handleInputChange}
        placeholder="Hotel Star Rating"
        className="input-field"
      />
      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white py-2 px-4 rounded-lg mt-4"
      >
        Add Hotel
      </button>
    </div>
  );
}
