
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { HotelDetails } from '../../classes/hotelDetails';

const createData = async (hotelDetails: HotelDetails) => {
    await addDoc(collection(db, 'hotels'), {
        ...hotelDetails,
        createdAt: hotelDetails.createdAt,
        updatedAt: hotelDetails.updatedAt
    });
};

export default createData;

