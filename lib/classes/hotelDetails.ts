

import { format } from 'date-fns';

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
    hotelSlug: string = "";
    hotelImagesList: { imageId: string, imageUrl: string, imageTitle: string }[] = [];
    createdAt: string = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
    updatedAt: string = format(new Date(), "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
}
