"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getDoc, doc } from "firebase/firestore";
import { db } from "@/lib/firebase/firebaseConfig";
import { HotelDetails } from "@/lib/classes/hotelDetails";






export default function HotelPage({ params }: { params: { hotelSlug: string } }) {
  const [hotelDetails, setHotelDetails] = useState<HotelDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchHotelDetails = async () => {
      try {
        const docRef = doc(db, "hotelDetails", params.hotelSlug);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setHotelDetails(docSnap.data() as HotelDetails);
        } else {
          router.push("/404");
        }
      } catch (error) {
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
      <div className="grid grid-cols-2 gap-8">
        {/* Left Column */}
        <div className="col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h1 className="text-3xl font-semibold mb-4">{hotelDetails.hotelName}</h1>
            <div className="mb-4">
              <p className="font-semibold">Email:</p>
              <p>{hotelDetails.hotelEmailId}</p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Contact Number:</p>
              <p>{hotelDetails.hotelContactNumber}</p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Star Rating:</p>
              <p>{hotelDetails.hotelStarRating}</p>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Location Details</h2>
            <div className="mb-4">
              <p className="font-semibold">Address:</p>
              <p>{hotelDetails.hotelAddress}</p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">City:</p>
              <p>{hotelDetails.hotelCity}</p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">State:</p>
              <p>{hotelDetails.hotelState}</p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Pincode:</p>
              <p>{hotelDetails.hotelPincode}</p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Created At:</p>
              <p>{hotelDetails.createdAt}</p>
            </div>
            <div className="mb-4">
              <p className="font-semibold">Updated At:</p>
              <p>{hotelDetails.updatedAt}</p>
            </div>
          </div>

          <div className="mt-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-semibold mb-4">Images</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {hotelDetails.hotelImagesList.map((image, index) => (
                <img key={index} src={image.imageUrl} alt={image.imageTitle} className="w-full h-auto rounded-lg" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
