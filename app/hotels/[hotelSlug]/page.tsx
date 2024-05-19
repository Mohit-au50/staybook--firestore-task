// individal hotel page, user will get redirected here from the hotels page

// export default function page({ params }: { params: { hotelSlug: string } }) {
//   return (
//     <div className="text-xl">
//       Update Individual hotel Details of <strong>{params.hotelSlug}</strong>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getHotelDetailsBySlug } from "../../../lib/firebase/create/createData"; // Assuming you have this function
import { HotelDetails } from "@/lib/classes/hotelDetails"; // Import the HotelDetails type
import { updateKeyAndValueFromDocument } from "../../../lib/firebase/create/createData"; // Import the update function

export default function HotelDetailsPage({
  params,
}: {
  params: { hotelSlug: string };
}) {
  const router = useRouter();
  const [hotelDetails, setHotelDetails] = useState<HotelDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<HotelDetails>>({}); // State for form data
  const [updating, setUpdating] = useState<boolean>(false); // State to track updating status

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdating(true); // Set updating status to true while updating
    const { hotelSlug } = params;
    const { status, data } = await updateKeyAndValueFromDocument(
      "hotels",
      hotelSlug,
      formData
    ); // Call the update function
    if (status === "OK") {
      console.log(data.message); // Log success message
      router.push('/hotels');
    } else {
      console.error(data.error); // Log error message
    }
    setUpdating(false); // Reset updating status after update
  };

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        // console.log("Fetching hotel details for slug:", params.hotelSlug);
        const details = await getHotelDetailsBySlug(params.hotelSlug);

        if (details) {
          setHotelDetails(details);
          setFormData(details);
        } else {
          router.push("/404");
        }
      } catch (error: any) {
        setError(error.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchHotelDetails();
  }, [params.hotelSlug, router]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!hotelDetails) {
    return <div>Hotel not found.</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit}>
        <div className="relative mb-8">
          <img
            src={hotelDetails.hotelImageUrl}
            alt={hotelDetails.hotelName}
            className="w-full h-96 object-cover rounded-lg"
          />
          <div className="absolute inset-0 flex items-center justify-center text-white text-4xl font-bold bg-black bg-opacity-50">
            {hotelDetails.hotelName}
          </div>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl font-semibold mb-4">
            {hotelDetails.hotelName}
          </h1>
          <div className="mb-4">
            <label>Email:</label>
            <input
              type="text"
              name="hotelEmailId"
              value={formData.hotelEmailId || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label>Contact Number:</label>
            <input
              type="text"
              name="hotelContactNumber"
              value={formData.hotelContactNumber || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label>Star Rating:</label>
            <input
              type="text"
              name="hotelStarRating"
              value={formData.hotelStarRating || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label>Address:</label>
            <input
              type="text"
              name="hotelAddress"
              value={formData.hotelAddress || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label>City:</label>
            <input
              type="text"
              name="hotelCity"
              value={formData.hotelCity || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label>State:</label>
            <input
              type="text"
              name="hotelState"
              value={formData.hotelState || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label>Pincode:</label>
            <input
              type="text"
              name="hotelPincode"
              value={formData.hotelPincode || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label>Created At:</label>
            <input
              type="text"
              name="createdAt"
              value={formData.createdAt || ""}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label>Updated At:</label>
            <input
              type="text"
              name="updatedAt"
              value={formData.updatedAt || ""}
              onChange={handleInputChange}
            />
          </div>
          <h2 className="text-2xl font-semibold mb-4">Images</h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {hotelDetails.hotelImagesList.map((image, index) => (
              <img
                key={index}
                src={image.imageUrl}
                alt={image.imageTitle}
                className="w-full h-auto rounded-lg"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={updating}
            style={{
              backgroundColor: "#4CAF50",
              color: "white",
              padding: "10px 20px",
              borderRadius: "4px",
              border: "none",
              cursor: "pointer",
              fontSize: "16px",
              transition: "background-color 0.3s",
            }}
          >
            {updating ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
}
