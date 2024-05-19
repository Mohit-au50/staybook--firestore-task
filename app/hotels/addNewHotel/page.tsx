"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dashify from "dashify";
import { addHotelDetailsInFirebaseCollection } from "../../../lib/firebase/create/createData";
import { HotelDetails, ImagesList } from "@/lib/classes/hotelDetails";
import { format } from "date-fns";

export default function AddNewHotelPage() {
  const router = useRouter();
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
    createdAt: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
    updatedAt: format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleAddImage = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      hotelImagesList: [
        ...prevFormData.hotelImagesList,
        { imageId: generateUUID(), imageUrl: "", imageTitle: "" },
      ],
    }));
  };

  const handleImageChange = (index: number, key: string, value: string) => {
    const newImagesList = [...formData.hotelImagesList];
    newImagesList[index] = { ...newImagesList[index], [key]: value };
    setFormData((prevFormData) => ({
      ...prevFormData,
      hotelImagesList: newImagesList,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!formData.hotelName || !formData.hotelCity) {
      console.error("Hotel name and city are required.");
      return;
    }
    const hotelSlug = dashify(`${formData.hotelName}-${formData.hotelCity}`);
    const updatedFormData = { ...formData, hotelSlug };

    const res = await addHotelDetailsInFirebaseCollection("hotels", updatedFormData);

    if (res.status === "OK") {
      console.log("Hotel added successfully");
      router.push("/hotels");
    } else {
      console.error(res.data.error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Hotel</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(formData).map(
          (key) =>
            key !== "hotelSlug" &&
            key !== "createdAt" &&
            key !== "updatedAt" &&
            key !== "hotelImagesList" && (
              <div key={key} className="flex flex-col">
                <label className="mb-2 capitalize" htmlFor={key}>
                  {key}
                </label>
                <input
                  type={
                    key === "hotelContactNumber" ||
                    key === "hotelStarRating" ||
                    key === "hotelPincode"
                      ? "number"
                      : "text"
                  }
                  id={key}
                  name={key}
                  value={(formData as any)[key]}
                  onChange={handleChange}
                  className="p-2 border border-gray-300 rounded"
                />
              </div>
            )
        )}
        <div className="flex flex-col">
          <label className="mb-2 capitalize">Hotel Images</label>
          {formData.hotelImagesList.map((image, index) => (
            <div key={index} className="mb-2">
              <input
                type="text"
                placeholder="Image URL"
                value={image.imageUrl}
                onChange={(e) => handleImageChange(index, "imageUrl", e.target.value)}
                className="p-2 border border-gray-300 rounded mb-2"
              />
              <input
                type="text"
                placeholder="Image Title"
                value={image.imageTitle}
                onChange={(e) => handleImageChange(index, "imageTitle", e.target.value)}
                className="p-2 border border-gray-300 rounded"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddImage}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Add Image
          </button>
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Add Hotel
        </button>
      </form>
    </div>
  );
}

// Utility function to generate UUID
const generateUUID = () => {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
};

