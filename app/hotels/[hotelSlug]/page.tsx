

"use client";

import React, { useState, useEffect } from 'react';
import HotelForm from '../../components/HotelForm';
import { useRouter } from 'next/navigation';
import { db } from '../../../lib/firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { HotelDetails } from '../../../lib/classes/hotelDetails';
import handleUpdate from '@/lib/firebase/update/handleUpdate';

// Define the props type
interface UpdateHotelProps {
  params: {
    hotelSlug: string;
  };
}

const UpdateHotel: React.FC<UpdateHotelProps> = ({ params }) => {
  const router = useRouter();
  const [initialData, setInitialData] = useState<HotelDetails | null>(null);

  // get id for dynamic routing
  const id = params.hotelSlug;

  // fetch the data
  useEffect(() => {
    const fetchHotel = async () => {
      if (id) {
        const hotelDoc = await getDoc(doc(db, 'hotels', id));
        if (hotelDoc.exists()) {
          setInitialData(hotelDoc.data() as HotelDetails);
        } else {
          console.error('No such document!');
        }
      }
    };

    fetchHotel();
  }, [id]);

  // updating the data
  const handleSubmit = async (updatedData: HotelDetails) => {
    try {
      if (id) {
        const success = await handleUpdate(id, updatedData);
        if (success) {
          alert('Hotel updated successfully');
          router.push("/hotels");
        } else {
          alert('Failed to update hotel');
        }
      }
    } catch (error) {
      console.error('Error updating hotel: ', error);
    }
  };

  if (!initialData) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1 className='text-center'>Update Hotel</h1>
      <HotelForm onSubmit={handleSubmit} initialData={initialData} />
    </div>
  );
};

export default UpdateHotel;
