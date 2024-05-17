/* 
    implement function to update individual key and value fields from the firebase document
    handle number and string value updation in the same function
    update the updatedAt time with the same format when any key gets updated in the document
*/
// Function to update objects inside an array in a Firestore document
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase/firebaseConfig";

export const updateKeyAndValueFromDocument = async (
    collectionName: string,
    docId: string,
    updateFields: { [key: string]: any }
  ) => {
    const docRef = doc(db, collectionName, docId);
  
    try {
      // Fetch the current document data
      const docSnap = await docRef.get();
      if (!docSnap.exists()) {
        return {
          status: "FAILED",
          data: {
            error: `Document does not exist with id: ${docId}`,
          },
        };
      }
  
      // Prepare updated data with updatedAt timestamp
      const updateData = {
        ...updateFields,
        updatedAt: serverTimestamp(),
      };
  
      // Update the document with the new data
      await updateDoc(docRef, updateData);
  
      return {
        status: "OK",
        data: {
          message: `Document updated successfully with id ${docId}`,
        },
      };
    } catch (error: any) {
      return {
        status: "FAILED",
        data: { error: error?.message || error },
      };
    }
  };

export const updateObjectsInsideArray = async (
    collectionName: string,
    docId: string,
    index: number,
    updatedObject: { [key: string]: any }
  ) => {
    const docRef = doc(db, collectionName, docId);
  
    try {
      // Fetch the current document data
      const docSnap = await docRef.get();
      if (!docSnap.exists()) {
        return {
          status: "FAILED",
          data: {
            error: `Document does not exist with id: ${docId}`,
          },
        };
      }
  
      // Get the current array from the document data
      const currentData = docSnap.data();
      if (!currentData || !Array.isArray(currentData.hotelImagesList)) {
        return {
          status: "FAILED",
          data: {
            error: "hotelImagesList is not present or not an array",
          },
        };
      }
  
      // Update the object at the specified index
      currentData.hotelImagesList[index] = {
        ...currentData.hotelImagesList[index],
        ...updatedObject,
        updatedAt: serverTimestamp(),
      };
  
      // Update the document with the modified array
      await updateDoc(docRef, currentData);
  
      return {
        status: "OK",
        data: {
          message: `Updated object at index ${index} in hotelImagesList for document with id ${docId}`,
        },
      };
    } catch (error: any) {
      return {
        status: "FAILED",
        data: { error: error?.message || error },
      };
    }
  };

// implement function to update the object inside the hotelImagesList from the firebase document
