"use client";

import Image from "next/image";
export default function Dashboard() {
  return (
    <div>
      <Image
        src={"/Vector 1.png"}
        alt="logo"
        height={300}
        width={200}
        className=""
      />
      <Image
        src={"/Vector 2.png"}
        alt="logo"
        height={200}
        width={90}
        className="absolute bottom-0"
      />

      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg md:mt-0 sm:max-w-md xl:p-0 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <div className="flex flex-col justify-center m-auto items-center mb-10">
              <h1 className="text-lg text-gray-900">Welcome</h1>
              <Image src={"/panda.png"} alt="logo" height={400} width={176} />
            </div>
          </div>
        </div>
      </div>
      <div className="fixed top-0 right-0">
         VERSION 2
      </div>
    </div>
  );
}
