"use client"

import React, { useState } from 'react';
import createData from '../../../lib/firebase/create/createData';
import { HotelDetails } from '../../../lib/classes/hotelDetails';
import { useRouter } from 'next/navigation';
import HotelForm from '../../components/HotelForm';  

const AddNewHotelPage: React.FC = () => {
    const router = useRouter();

    // add new hotel to database
    const handleSubmit = async (hotelData: HotelDetails) => {
        try {
            await createData(hotelData);
            alert('Hotel added successfully!');
            router.push("/hotels");
        } catch (error) {
            console.error('Error adding hotel: ', error);
        }
    };

    return (
        <HotelForm onSubmit={handleSubmit} />
    );
};

export default AddNewHotelPage;
