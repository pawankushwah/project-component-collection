'use client';
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type propsType = {
  images: String[];
  imagePath: String;
};

export default function ImageSlider({ images, imagePath }: propsType) {
  const [slide, setSlide] = useState(1);

  function handleNext(){
    let nextIndex = (slide === images.length) ? 1 : slide + 1;
    setSlide(nextIndex);
  }

  function handlePrev(){
    let prevIndex = (slide === 1) ? images.length : slide - 1;
    setSlide(prevIndex);
  }
  return (
    <div className="flex relative overflow-x-auto select-none h-fit">
      <div className="w-full h-40 flex justify-center items-center">
      <Image src={`${imagePath}/${images[slide-1]}`} className="h-full" alt="slide" width={400} height={400} />
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 left-5 right-5 flex justify-between items-center">
        <Link href={"#"} onClick={handlePrev} id="prev" className="bg-gray-800 hover:bg-gray-500 rounded-full cursor-pointer p-5 w-5 h-5 flex justify-center items-center opacity-50 hover:opacity-100">❮</Link>
        <Link href={"#"} onClick={handleNext} id="next" className="bg-gray-800 hover:bg-gray-500 rounded-full cursor-pointer p-5 w-5 h-5 flex justify-center items-center opacity-50 hover:opacity-100">❯</Link>
      </div>
    </div>
  );
}
