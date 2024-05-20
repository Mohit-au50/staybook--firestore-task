"use client"; 
import { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/firebaseConfig";

export default function HotelsPage() {
  const [hotels, setHotels] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const hotelsCollection = collection(db, "hotelDetails");
        const querySnapshot = await getDocs(hotelsCollection);
        const fetchedHotels = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setHotels(fetchedHotels);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message || "An unexpected error occurred.");
        } else {
          setError("An unexpected error occurred.");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <section className="w-full h-screen bg-gray-100">
      <div className="container mx-auto h-full py-10">
        <div className="flex items-center justify-between py-4">
          <h1 className="text-2xl font-bold tracking-wide">All Hotels List</h1>
          <Link
            href="/hotels/addNewHotel"
            className="p-2 px-4 bg-green-100 text-green-800 font-medium tracking-wide rounded"
          >
            Add New Hotel
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {hotels.map((hotel, index) => (
            <Link href={`/hotels/${hotel.id}`} key={index}>
              <div
                className="relative bg-cover bg-center bg-no-repeat w-full h-64 rounded-lg overflow-hidden cursor-pointer"
                style={{ backgroundImage: `url(${hotel.hotelImageUrl})` }}
              >
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent">
                  <h2 className="text-white font-bold text-xl">{hotel.hotelName}</h2>
                  <p className="text-gray-200">{hotel.hotelCity}, {hotel.hotelState}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
