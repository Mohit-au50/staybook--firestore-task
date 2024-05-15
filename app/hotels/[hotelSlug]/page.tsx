"use client";

import { useEffect, useState } from 'react';
import { readDataFromFirebaseCollection } from '@/lib/firebase/read/readData';
import { updateKeyAndValueFromDocument, deleteHotelDocument} from '@/lib/firebase/update/updateData';
import Link from 'next/link';

export default function HotelPage({ params }: { params: { hotelSlug: string } }) {
  const [hotelDetails, setHotelDetails] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedHotelDetails, setUpdatedHotelDetails] = useState<any>({});
  // const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await readDataFromFirebaseCollection();
        const hotel = data.find((hotel: any) => hotel.hotelSlug === params.hotelSlug);
        console.log(hotel);
        setHotelDetails(hotel);
        setUpdatedHotelDetails(hotel); // Initialize updated details with current details
      } catch (error) {
        console.error('Error fetching hotel details: ', error);
      }
    }

    fetchData();
  }, [params.hotelSlug]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedHotelDetails((prevDetails: any) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const { status, data } = await updateKeyAndValueFromDocument(
      hotelDetails.hotelSlug, 
      updatedHotelDetails
    );
    console.log(status);
    if (status === 'OK') {
      setIsEditing(false);
      setHotelDetails(updatedHotelDetails);
    } else {
      console.error('Failed to update hotel details: ', data.error);
    }
  };

  const handleDelete = async () => {
    const { status, data } = await deleteHotelDocument(hotelDetails.hotelSlug);
    if (status === 'OK') {
      // Redirect to the hotels page or any other page
      // router.push('/hotels');
    } else {
      console.error('Failed to delete hotel document:', data.error);
    }
  };
  
  return (
    <div className="container mx-auto py-10 px-4">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <div>
    <Link href="/hotels">
        < div className="block mb-4 text-blue-500">&larr; Back to Main Page</div>
      </Link>
      <img
        src={hotelDetails?.hotelImageUrl || '/placeholder.jpg'}
        alt={hotelDetails?.hotelName || 'Hotel Image'}
        className="rounded-lg shadow-lg w-full h-auto"
      />
    </div>
    <div className="space-y-4 mt-12 pt-2">
      <h1 className="text-3xl font-bold mb-4">{hotelDetails?.hotelName || 'Loading...'}</h1>
      {isEditing ? (
        <>
          <input type="text" name="hotelName" value={updatedHotelDetails.hotelName} onChange={handleChange} placeholder="Hotel Name" className="input-field" />
          <input type="text" name="hotelAddress" value={updatedHotelDetails.hotelAddress} onChange={handleChange} placeholder="Hotel Address" className="input-field" />
          <input type="text" name="hotelCity" value={updatedHotelDetails.hotelhotelCityName} onChange={handleChange} placeholder="Hotel City" className="input-field" />
          <input type="text" name="hotelPincode" value={updatedHotelDetails.hotelPincode} onChange={handleChange} placeholder="Pincode" className="input-field" />
          <input type="text" name="hotelState" value={updatedHotelDetails.hotelState} onChange={handleChange} placeholder="State" className="input-field" />
          <input type="text" name="hotelContactNumber" value={updatedHotelDetails.hotelContactNumber} onChange={handleChange} placeholder="Contact Number" className="input-field" />                
          <input type="text" name="hotelEmailId" value={updatedHotelDetails.hotelEmailId} onChange={handleChange} placeholder="Email Id" className="input-field" />
          <input type="text" name="hotelImageUrl" value={updatedHotelDetails.hotelImageUrl} onChange={handleChange} placeholder="Hotel Image URL" className="input-field" />
          <input type="text" name="hotelStarRating" value={updatedHotelDetails.hotelStarRating} onChange={handleChange} placeholder="Star Rating" className="input-field" />           
          <button onClick={handleSave} className="bg-blue-500 text-white py-2 px-4 rounded-lg mt-4 mx-1">Save</button>
          <button onClick={handleDelete} className="bg-red-500 text-white py-2 px-4 rounded-lg mt-4 mx-1"><Link href="/hotels">Delete</Link></button>
        </>
      ) : (
        <>
          <div className="grid grid-cols-2 gap-x-4">
            <div>
              <p className="text-gray-600 mb-2">
                <strong>Address:</strong> {hotelDetails?.hotelAddress || 'Loading...'}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>City:</strong> {hotelDetails?.hotelCity || 'Loading...'}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>State:</strong> {hotelDetails?.hotelState || 'Loading...'}
              </p>
            </div>
            <div>
              <p className="text-gray-600 mb-2">
                <strong>Pincode:</strong> {hotelDetails?.hotelPincode || 'Loading...'}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Contact Number:</strong> {hotelDetails?.hotelContactNumber || 'Loading...'}
              </p>
              <p className="text-gray-600 mb-2">
                <strong>Email Id:</strong> {hotelDetails?.hotelEmailId || 'Loading...'}
              </p>
            </div>
          </div>
          <p className="text-gray-600 mb-2">
            <strong>Star Rating:</strong> {hotelDetails?.hotelStarRating || 'Loading...'}
          </p>

          <button onClick={handleEdit} className="bg-green-500 text-white py-2 px-4 rounded-lg mt-4">Edit</button>
        </>
      )}
    </div>
  </div>
</div>
  )
}
