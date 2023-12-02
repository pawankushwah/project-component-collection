import { faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import TextWithImage from "./TextWithImage";

export default function About() {
  return (
    <div className="p-4 text-center mt-4 mb-12 flex flex-col lg:p-8 max-w-6xl mx-auto">
      <div className="flex flex-col lg:flex-row lg:justify-between">
        <div className="flex flex-col justify-center items-center lg:items-start lg:flex-[5]">
          <div className="text-[2.5rem] max-w-sm w-full text-black font-bold tracking-widest leading-relaxed sm:leading-9 mb-8 lg:text-7xl lg:max-w-3xl lg:text-left">
            <span className="group text-center inline-block p-1">
              <TextWithImage text="Teaching" size={10} />
            </span>

            <span className="inline-block">
              <span> Online </span>
              <Image
                alt=""
                src={"/teachline-images/3-leaf-flower.svg"}
                width={20}
                height={20}
                className="relative -top-16 -right-32 lg:-top-20 lg:-right-60 lg:w-10"
              />
            </span>
            <span> with TeachLine</span>
          </div>

          <div className="text-gray-600 font-normal mb-8 lg:w-[30rem] lg:text-left lg:text-lg">
            At TeachLine, we are on a mission to revolutionize online education.
            Founded with a passion for learning and a commitment to making
            quality education accessible to all.
          </div>

          <div className="space-x-4">
            <button className="text-white bg-[var(--primary)] hover:-translate-y-1 duration-500 ease-in-out p-3 rounded-lg px-5">
              Get Started
            </button>
            <button className="text-[var(--primary)] border-2 border-[var(--primary)] hover:-translate-y-1 duration-500 ease-in-out p-3 rounded-lg px-5">
              {" "}
              <FontAwesomeIcon icon={faPlay} className="pr-4" /> Free Tutorial
            </button>
          </div>
        </div>

        <div className="relative lg:w-full lg:flex-[3]">
          <Image
            width={500}
            height={500}
            src={"/teachline-images/home-hero.webp"}
            alt="book stack images"
            className="w-full lg:w-[30-rem]"
          />
          <span className="absolute bg-white flex bottom-8 left-6 drop-shadow-md rounded-xl p-4 lg:-left-40">
            <span className="w-14 rounded-full p-3">
              <Image
                width={30}
                height={30}
                src={"/teachline-images/certificate.png"}
                alt="certificate logo"
                className="w-full"
              />
            </span>
            <span className="flex flex-col text-left">
              <span className="text-red-400">Certificate</span>
              <span className="text-black w-60">
                There are certificates for all courses.
              </span>
            </span>
          </span>
        </div>
      </div>

      <div className="flex flex-col justify-center items-center gap-10 mt-8 p-12 shadow-lg rounded-xl lg:flex-row lg:gap-x-40">
        <div className="flex flex-col gap-2">
          <span className="text-red-300 text-4xl lg:text-6xl">10K+</span>
          <span className="text-gray-800">Students</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-red-300 text-4xl lg:text-6xl">20+</span>
          <span className="text-gray-800">Quality Courses</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-red-300 text-4xl lg:text-6xl">10+</span>
          <span className="text-gray-800">Experience Mentors</span>
        </div>
      </div>
    </div>
  );
}
