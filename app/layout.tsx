import "@/styles/globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Staybook Task",
  description: "Staybook Task Application",
};

export default function Main({ children }: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>
        <div className="border-b py-3 m-1 text-center bg-green-200 font-bold text-xl">
          Stay Book
        </div>
        <main>{children}</main>
      </body>
    </html>
  );
}
