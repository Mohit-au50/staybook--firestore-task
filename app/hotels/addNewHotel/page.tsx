// import { HotelDetails } from "@/lib/classes/hotelDetails";
// import { useState } from "react";

/*
    import addHotelDetailsInFirebaseCollection function here and pass hotelDetails Object
    pass collection name and hotelData from here to the function
*/
// export default function AddNewHotelPage() {
//   // const [formData, setFormData] = useState<HotelDetails>({});
//   // you can use dashify npm package to create a hotelSlug after hotelName and hotelCity is filled
//   // https://www.npmjs.com/package/dashify

//   // handle basic data validation like number value gets added as number only not in string, email validation etc
//   // use can use zod validations if you wish to

//   // handle form submittion logic
//   //   const handleSubmit = async () => {
//   //     if form data is valid then call the function and add the data in firebase
//   //     const res = await addHotelDetailsInFirebaseCollection(
//   //       "collectionName",
//   //       formData
//   //     );
//   //     hanlde redirection logic here redirect the user ot /hotels page after data is successfully added to the database
//   //     if (res.status === "OK") {
//   //     }
//   //   };

//   return (
//     // add components to utilize them and reuse them insted of using a input field again and again
//     <div>AddNewHotelPage add inputs etc to add the hotel to the firebase</div>
//   );
// }
"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import dashify from "dashify";
import { addHotelDetailsInFirebaseCollection } from "../../../lib/firebase/create/createData";
import { HotelDetails } from "@/lib/classes/hotelDetails";

type HotelDetailsKeys = keyof HotelDetails;

export default function AddNewHotelPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<HotelDetails>({
    hotelName: "",
    hotelEmailId: "",
    hotelContactNumber: 0,
    hotelStarRating: 0,
    hotelImageUrl: "",
    hotelAddress: "",
    hotelState: "",
    hotelCity: "",
    hotelPincode: "",
    hotelSlug: "",
    hotelImagesList: [],
    createdAt: "",
    updatedAt: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!formData.hotelName || !formData.hotelCity) {
      console.error("Hotel name and city are required.");
      return;
    }
    const hotelSlug = dashify(`${formData.hotelName}-${formData.hotelCity}`);
    const updatedFormData = { ...formData, hotelSlug };
  
    const res = await addHotelDetailsInFirebaseCollection("hotels", updatedFormData);
    console.log("got result");
    console.log(res);
  
    if (res.status === "OK") {
      console.log("Hotel added successfully");
      router.push('/hotels');
    } else {
      console.error(res.data.error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-bold mb-4">Add New Hotel</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(formData).map((key) => (
          (key !== "hotelSlug" && key !== "createdAt" && key !== "updatedAt" && key !== "hotelImagesList") && (
            <div key={key} className="flex flex-col">
              <label className="mb-2 capitalize" htmlFor={key}>{key}</label>
              <input
                type={
                  key === "hotelContactNumber" || key === "hotelStarRating" || key === "hotelPincode"
                    ? "number"
                    : "text"
                }
                id={key}
                name={key}
                value={(formData as any)[key]}
                onChange={handleChange}
                className="p-2 border border-gray-300 rounded"
              />
            </div>
          )
        ))}
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
          Add Hotel
        </button>
      </form>
    </div>
  );
}
