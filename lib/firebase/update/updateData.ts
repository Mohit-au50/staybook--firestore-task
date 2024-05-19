import { doc, updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { format } from "date-fns";
import { HotelDetails, ImagesList } from "@/lib/classes/hotelDetails";

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
        ...updatedFields
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


export const updateObjectsIndsideArray = (
    hotel: HotelDetails,
    imageId: string,
    newValues: Partial<ImagesList>
  ): HotelDetails => {
    const index = hotel.hotelImagesList.findIndex(
      (image) => image.imageId === imageId
    );

    if (index !== -1) {

      const updatedHotel = { ...hotel };  
      const updatedImage = { ...updatedHotel.hotelImagesList[index] };
  
      updatedHotel.hotelImagesList[index] = {
        ...updatedImage,
        ...newValues,
      };

      return updatedHotel;
    }
  
    return hotel;
  };

