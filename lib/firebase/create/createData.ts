import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { HotelDetails } from "../../classes/hotelDetails";

export const addHotelDetailsInFirebaseCollection = async (
  collectionName: string,
  hotelData: HotelDetails
) => {
  console.log("collectionName >>", collectionName);
  console.log("hotelData >>", hotelData);

  // Your document collection reference
  const docRef = doc(db, collectionName, hotelData.hotelSlug);

  try {
    const docSnap = await getDoc(docRef);
    // If a document already exists with the hotel slug, then return an object with an error
    if (docSnap.exists()) {
      return {
        status: "FAILED",
        data: {
          error: `Document already exists with the provided slug: ${hotelData.hotelSlug}`,
        },
      };
    }

    // Set the data accordingly
    const data: HotelDetails = {
      hotelName: hotelData.hotelName,
      hotelEmailId: hotelData.hotelEmailId,
      hotelContactNumber: hotelData.hotelContactNumber,
      hotelStarRating: hotelData.hotelStarRating,
      hotelImageUrl: hotelData.hotelImageUrl,
      hotelAddress: hotelData.hotelAddress,
      hotelState: hotelData.hotelState,
      hotelCity: hotelData.hotelCity,
      hotelPincode: hotelData.hotelPincode,
      hotelSlug: hotelData.hotelSlug,
      hotelImagesList: hotelData.hotelImagesList,
    };

    // Add the document to the Firebase database
    await setDoc(docRef, data);

    // Return the success message
    return {
      status: "OK",
      data: {
        message: `Document added with id ${hotelData.hotelSlug}`,
      },
    };
  } catch (error: any) {
    return {
      status: "FAILED",
      data: { error: error?.message || error },
    };
  }
};
