import { format } from "date-fns";

export class HotelDetails {
  hotelName: string = "";
  hotelEmailId: string = "";
  hotelContactNumber: number = 0;
  hotelStarRating: number = 0;
  hotelImageUrl: string = "";

  hotelAddress: string = "";
  hotelState: string = "";
  hotelCity: string = "";
  hotelPincode: string = "";

  // hotel slug will be generated automatically it will be in lowercase dashified version of the hotelName + hotelCity
  /* 
    example
    hotelName = "Jai Balaji"
    hotelCity = "New Delhi"

    staybook-hotel-${hotelName}-${hotelCity}
    
    hotelSlug = staybook-hotel-jai-balaji-new-delhi
  */
  hotelSlug: string = "";
  hotelImagesList: ImagesList[] = [];

  createdAt: string = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
  updatedAt: string = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
}

export class ImagesList {
  imageId: string = "";
  imageUrl: string = "";
  imageTitle: string = "";
}


