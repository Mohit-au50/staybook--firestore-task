
import Link from "next/link";
export default function Home() {
  return (
    <section className="w-full h-screen grid place-items-center bg-dark">
      <Link
        href="/hotels"
        className="p-4 px-7 font-medium text-green-800 bg-green-100 rounded"
      >
        Go to Hotels Page
      </Link>
    </section>
  );
}
