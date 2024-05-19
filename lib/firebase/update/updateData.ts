/* 
    implement function to update individual key and value fields from the firebase document
    handle number and string value updation in the same function
    update the updatedAt time with the same format when any key gets updated in the document
*/
// export const updateKeyAndValueFromDocument = () => {};

// implement function to update the object inside the hotelImagesList from the firebase document
// export const updateObjectsIndsideArray = () => {};

import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { format } from "date-fns";

export const updateKeyAndValueFromDocument = async (
  collectionName: string,
  documentId: string,
  key: string,
  value: any
) => {
  console.log("Updating document:", documentId, "Key:", key, "Value:", value);

  const docRef = doc(db, collectionName, documentId);
  const updatedAt = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

  try {
    const updateData: any = {
      updatedAt,
    };
    updateData[key] = value;

    await updateDoc(docRef, updateData);

    return {
      status: "OK",
      data: {
        message: `Document with id ${documentId} updated successfully`,
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
  documentId: string,
  imageObject: any,
  operation: 'add' | 'remove'
) => {
  console.log("Updating array in document:", documentId, "Image Object:", imageObject, "Operation:", operation);

  const docRef = doc(db, collectionName, documentId);
  const updatedAt = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

  try {
    let updateData: any = {
      updatedAt,
    };

    if (operation === 'add') {
      updateData['hotelImagesList'] = arrayUnion(imageObject);
    } else if (operation === 'remove') {
      updateData['hotelImagesList'] = arrayRemove(imageObject);
    }

    await updateDoc(docRef, updateData);

    return {
      status: "OK",
      data: {
        message: `Array in document with id ${documentId} updated successfully`,
      },
    };
  } catch (error: any) {
    return {
      status: "FAILED",
      data: { error: error?.message || error },
    };
  }
};

