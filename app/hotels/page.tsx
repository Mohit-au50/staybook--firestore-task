"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase/firebaseConfig";

export default function HotelPage() {
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
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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
</div>

      </div>
    </section>
  );
}
