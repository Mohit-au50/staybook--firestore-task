import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { HOTEL_DETAILS_DB_COLLECTION } from "../../constants";

export const updateKeyAndValueFromDocument = async (
  hotelSlug: string,
  updatedFields: any
) => {
  console.log(hotelSlug, updatedFields);
  const docRef = doc(db, HOTEL_DETAILS_DB_COLLECTION, hotelSlug);

  try {
    // Get the current document data
    const docSnap = await getDoc(docRef);
    const currentData: any = docSnap.data();
    console.log("geeress", currentData)

    // Merge the new data with the current data
    const newData = { ...currentData, ...updatedFields };
    console.log("New Data:", newData);


    // Update the document with the merged data
    await updateDoc(docRef, newData);
    console.log("Update successful")
    return {
      status: "OK",
      data: {
        message: `Document ${hotelSlug} updated successfully.`,
      },
    };
  } catch (error: any) {
    console.log(error)
    return {
      status: "FAILED",
      data: { error: error?.message || error },
    };
  }
};

export const deleteHotelDocument = async (hotelSlug: string) => {
  const docRef = doc(db, HOTEL_DETAILS_DB_COLLECTION, hotelSlug);

  try {
    await deleteDoc(docRef);
    console.log("check")
    return {
      status: "OK",
      data: {
        message: `Document ${hotelSlug} deleted successfully.`,
      },
    };
  } catch (error: any) {
    return {
      status: "FAILED",
      data: { error: error?.message || error },
    };
  }
};
