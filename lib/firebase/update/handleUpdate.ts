import { db } from '../firebaseConfig';
import { doc, updateDoc } from 'firebase/firestore';
import { HotelDetails } from '../../classes/hotelDetails';

const handleUpdate = async (id: string, updatedData: HotelDetails) => {
  try {
    const plainUpdatedData = convertToPlainObject(updatedData);
    await updateDoc(doc(db, 'hotels', id), plainUpdatedData);
    console.log('Hotel updated successfully');
    return true; // Indicate success
  } catch (error) {
    console.error('Error updating hotel: ', error);
    return false; // Indicate failure
  }
};

const convertToPlainObject = (obj: any) => {
  return JSON.parse(JSON.stringify(obj));
};


export default handleUpdate;