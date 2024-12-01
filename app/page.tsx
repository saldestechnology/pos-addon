import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-12 grid-cols-12 h-screen w-screen">
      <div className="bg-pink-200 col-span-9 row-span-1"></div>
      <div className="bg-slate-600 row-start-2 row-end-12"></div>
      <div className="bg-lime-600 row-start-2 row-end-12 col-start-2 col-end-10"></div>
      <div className="bg-blue-500 row-start-12 row-end-13 col-span-9"></div>
      <div className="bg-emerald-500 col-start-10 col-end-13 row-start-1 row-end-13"></div>
    </div>
  );
}
