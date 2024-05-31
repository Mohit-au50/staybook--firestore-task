import { collection, getDocs, query } from "firebase/firestore";
import { doc, getDoc, setDoc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { format } from "date-fns";
import { HotelDetails } from "../../classes/hotelDetails";

const toPlainObject = (instance: any) => {
  return JSON.parse(JSON.stringify(instance));
};

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

