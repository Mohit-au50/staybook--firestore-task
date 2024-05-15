import { HotelsData } from "@/lib/utils";
import Link from "next/link";

export default function HotelPage() {
  

  return (
    <section className="w-full h-screen">
      <div className="container mx-auto h-full py-10">
        <div className="flex items-center justify-between py-4">
          <h1 className="text-2xl font-bold tracking-wide">All Hotels List</h1>
          <Link
            href={"/hotels/addNewHotel"}
            className="p-2 px-4 bg-green-100 text-green-800 font-medium tracking-wide rounded"
          >
            Add New Hotel
          </Link>
        </div>
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <HotelsData />
        </div>
      </div>
    </section>
  );
}
