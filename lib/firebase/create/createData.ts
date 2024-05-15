import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { HotelDetails } from "../../classes/hotelDetails";

export const addHotelDetailsInFirebaseCollection = async (
  collectionName: string,
  hotelData: HotelDetails
): Promise<{ status: string; data: any }> => {

  hotelData.hotelSlug = `staybook-hotel-${hotelData.hotelName.replace(/\s/g, '')}-${hotelData.hotelCity.toLowerCase()}`;
  const docRef = doc(db, collectionName, hotelData.hotelSlug);

  try {
    const isExist = await getDoc(docRef);

    if (isExist.exists()) {
      return {
        status: "FAILED",
        data: {
          error: `Document already exists with the provided slug ${hotelData.hotelSlug}`,
        },
      };
    }

    await setDoc(docRef, hotelData);

    return {
      status: "OK",
      data: {
        message: `Document added with ID ${hotelData.hotelSlug}`,
      },
    };
  } catch (error: any) {
    return {
      status: "FAILED",
      data: { error: error?.message || error },
    };
  }
};
