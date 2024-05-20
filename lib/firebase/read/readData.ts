import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { HOTEL_DETAILS_DB_COLLECTION } from "../../constants";

export const readDataFromFirebaseCollection = async () => {
  const querySnapshot = await getDocs(collection(db, HOTEL_DETAILS_DB_COLLECTION));
  const data: any[] = [];

  querySnapshot.forEach((doc) => {
    data.push(doc.data());
  });

  return data;
};