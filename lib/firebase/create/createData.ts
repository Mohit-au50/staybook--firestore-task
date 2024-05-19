// import { doc, getDoc, setDoc } from "firebase/firestore";
// import { db } from "../firebaseConfig";
// import { HotelDetails } from "../../classes/hotelDetails";

// const toPlainObject = (instance: any) => {
//   return JSON.parse(JSON.stringify(instance));
// };

// export const addHotelDetailsInFirebaseCollection = async (
//   collectionName: string,
//   hotelData: HotelDetails
// ) => {
//   console.log("collectionName >>", collectionName);
//   console.log("hotelData >>", hotelData);

//   // your document collection reference
//   const docRef = doc(db, collectionName, hotelData.hotelSlug);

//   console.log(docRef);

//   try {
//     const isExsist = await getDoc(docRef);
//     // if a document already exsits with the hotel slug then return an object with error
//     if (isExsist.exists()) {
//       return {
//         status: "FAILED",
//         data: {
//           error: `document already exsist with the slug provide ${hotelData.hotelSlug}`,
//         },
//       };
//     }

//     // create a new instance of the hotelDetails class into data variable
//     let data = new HotelDetails();

//     // set the data accordingly
//     data.hotelName = hotelData.hotelName;
//     data.hotelEmailId = "";
//     data.hotelContactNumber = 0;
//     data.hotelStarRating = 0;
//     data.hotelImageUrl = "";
//     data.hotelAddress = "";
//     data.hotelState = "";
//     data.hotelCity = "";
//     data.hotelPincode = "";
//     data.hotelSlug = "";
//     data.hotelImagesList = [];

//     // you can leave createdAt and updatedAt because they will have the current time by default which is specified in the classModel
//     // data.createdAt = "";
//     // data.updatedAt = "";

//     // finally add the document in the firebase database

//     const dataObj = toPlainObject(hotelData);

//     const res = await setDoc(docRef, dataObj);

//     // return the success message
//     return {
//       status: "OK",
//       data: {
//         message: `document added with id ${hotelData.hotelSlug}`,
//       },
//     };
//   } catch (error: any) {
//     return {
//       status: "FAILED",
//       data: { error: error?.message || error },
//     };
//   }
// };


// export const fetchHotelsFromFirestore = async () => {
//   const hotelsCollection = collection(db, "hotels");
//   const hotelsSnapshot = await getDocs(hotelsCollection);
//   const hotelsList = hotelsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as HotelDetails[];
//   return hotelsList;
// };

import { collection, getDocs, query } from "firebase/firestore";
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { format } from "date-fns";
import { HotelDetails } from "../../classes/hotelDetails";

// Utility function to convert class instance to plain object
const toPlainObject = (instance: any) => {
  return JSON.parse(JSON.stringify(instance));
};

// Function to add new hotel details to Firestore
export const addHotelDetailsInFirebaseCollection = async (
  collectionName: string,
  hotelData: HotelDetails
) => {
  const docRef = doc(db, collectionName, hotelData.hotelSlug);

  try {
    const isExist = await getDoc(docRef);
    if (isExist.exists()) {
      return {
        status: "FAILED",
        data: {
          error: `Document already exists with the slug provided ${hotelData.hotelSlug}`,
        },
      };
    }

    // Convert hotelData to plain object
    const data = toPlainObject(hotelData);

    await setDoc(docRef, data);

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

// Function to update key and value in a document
// export const updateKeyAndValueFromDocument = async (
//   collectionName: string,
//   documentId: string,
//   key: string,
//   value: any
// ) => {
//   const docRef = doc(db, collectionName, documentId);
//   const updatedAt = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

//   try {
//     const updateData: any = {
//       updatedAt,
//     };
//     updateData[key] = value;

//     await updateDoc(docRef, updateData);

//     return {
//       status: "OK",
//       data: {
//         message: `Document with id ${documentId} updated successfully`,
//       },
//     };
//   } catch (error: any) {
//     return {
//       status: "FAILED",
//       data: { error: error?.message || error },
//     };
//   }
// };

export const updateKeyAndValueFromDocument = async (
  collectionName: string,
  documentId: string,
  updatedFields: Partial<HotelDetails>
) => {
  const docRef = doc(db, collectionName, documentId);
  const updatedAt = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");

  try {
    const updateData: any = {
      updatedAt,
      ...updatedFields // Spread the updated fields into the updateData object
    };

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


// Function to update objects inside an array in a document
export const updateObjectsInsideArray = async (
  collectionName: string,
  documentId: string,
  imageObject: any,
  operation: 'add' | 'remove'
) => {
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


export const fetchHotelsFromFirestore = async (): Promise<HotelDetails[]> => {
  const hotelsCollection = collection(db, "hotels");
  const hotelsSnapshot = await getDocs(hotelsCollection);
  const hotelsList: HotelDetails[] = [];

  hotelsSnapshot.forEach((doc) => {
    const hotelData = doc.data();
    const hotelDetails: HotelDetails = {
      hotelName: hotelData.hotelName || "",
      hotelEmailId: hotelData.hotelEmailId || "",
      hotelContactNumber: hotelData.hotelContactNumber || 0,
      hotelStarRating: hotelData.hotelStarRating || 0,
      hotelImageUrl: hotelData.hotelImageUrl || "",
      hotelAddress: hotelData.hotelAddress || "",
      hotelState: hotelData.hotelState || "",
      hotelCity: hotelData.hotelCity || "",
      hotelPincode: hotelData.hotelPincode || "",
      hotelSlug: doc.id,
      hotelImagesList: hotelData.hotelImagesList || [],
      createdAt: hotelData.createdAt || format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
      updatedAt: hotelData.updatedAt || format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx"),
    };

    hotelsList.push(hotelDetails);
  });

  return hotelsList;
};


// Function to fetch hotel details by slug from Firestore
export const getHotelDetailsBySlug = async (slug: string): Promise<HotelDetails | null> => {
  try {
    const docRef = doc(db, "hotels", slug);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as HotelDetails;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching hotel details:", error);
    return null;
  }
};

