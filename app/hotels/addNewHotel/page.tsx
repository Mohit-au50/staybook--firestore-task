import Link from "next/link";
import {AddNewHotelForm} from "@/lib/utils";

const AddNewHotelPage = () => {
  return (
    <div>
      <Link href="/hotels">
        <div className="block mt-8 ml-4 text-blue-500">&larr; Back to Main Page</div>
      </Link>
      <AddNewHotelForm />
    </div>
  );
}

export default AddNewHotelPage;