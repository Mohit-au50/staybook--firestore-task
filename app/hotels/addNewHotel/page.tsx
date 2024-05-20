"use client"; // Ensure this component is treated as a client component

import { useState } from "react";
import { useRouter } from "next/navigation";
import dashify from "dashify";
import { addHotelDetailsInFirebaseCollection } from "@/lib/firebase/create/createData";
import { HotelDetails, ImagesList } from "@/lib/classes/hotelDetails";

export default function AddNewHotelPage() {
  const [formData, setFormData] = useState<Partial<HotelDetails & { hotelImagesListString?: string }>>({});
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      if (!formData.hotelName || !formData.hotelCity) {
        setError("Hotel name and city are required to create a slug.");
        return;
      }

      const hotelSlug = `staybook-hotel-${dashify(`${formData.hotelName} ${formData.hotelCity}`)}`;
      const hotelImagesList: ImagesList[] = formData.hotelImagesListString
        ? formData.hotelImagesListString.split(',').map(url => ({
            imageId: dashify(url),
            imageUrl: url,
            imageTitle: dashify(url)
          }))
        : [];

      const hotelData: HotelDetails = {
        ...new HotelDetails(),  // Create an instance of HotelDetails to ensure default values
        ...formData,
        hotelName: formData.hotelName!,
        hotelCity: formData.hotelCity!,
        hotelSlug,
        hotelImagesList,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const res = await addHotelDetailsInFirebaseCollection("hotelDetails", hotelData);

      if (res.status === "OK") {
        setSuccess(`Hotel added successfully: ${hotelData.hotelSlug}`);
        router.push(`/hotels/${hotelData.hotelSlug}`);
      } else {
        setError(res.data.error);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unexpected error occurred.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h1 className="text-2xl font-semibold mb-4">Add New Hotel</h1>
      <form onSubmit={handleSubmit}>
        {[
          { label: "Hotel Name", name: "hotelName", type: "text", required: true },
          { label: "Email", name: "hotelEmailId", type: "email" },
          { label: "Contact Number", name: "hotelContactNumber", type: "number" },
          { label: "Star Rating", name: "hotelStarRating", type: "number" },
          { label: "Image URL", name: "hotelImageUrl", type: "url" },
          { label: "Address", name: "hotelAddress", type: "text" },
          { label: "State", name: "hotelState", type: "text" },
          { label: "City", name: "hotelCity", type: "text", required: true },
          { label: "Pincode", name: "hotelPincode", type: "text" },
          { label: "Image URLs (comma-separated)", name: "hotelImagesListString", type: "text" }
        ].map((field, index) => (
          <div className="mb-4" key={index}>
            <label className="block text-gray-700">{field.label}:</label>
            <input
              type={field.type}
              name={field.name}
              value={formData[field.name] || ""}
              onChange={handleChange}
              required={field.required}
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        ))}
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md">
          Add Hotel
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {success && <p className="text-green-500 mt-4">{success}</p>}
    </div>
  );
}
