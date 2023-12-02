import Image from "next/image";
import React from "react";

export default function loading() {
  return (
    <>
      <div className="fixed z-10 top-0 flex flex-col bg-white w-screen h-screen justify-center items-center transition-all ease-in-out">
        <div className="flex justify-center items-center">
          <Image
            src={"/teachline-images/techline.png"}
            width={100}
            height={100}
            alt="codeshop webiste Logo"
            className="fixed object-cover"
          />
          <div className="w-48 h-48 border-8 border-r-blue-500 rounded-full animate-spin"></div>
        </div>
        <div className="text-2xl mt-4">Loading...</div>
      </div>
    </>
  );
}
