import React from "react";

export default function SubscribeUs() {
  return (
    <div className="bg-white flex justify-center items-center p-5 py-10 mb-9 text-black max-w-6xl mx-auto">
      <div className="flex flex-col p-20 bg-[#ffc0c0] justify-center items-center gap-y-5 rounded-3xl w-full">
        <div className="text-4xl font-bold text-center lg:text-5xl">
          Subscribe to Our News Letter
        </div>
        <div className="text-center text-gray-700">
          Subscribe to our newsletter to get information about our courses.
        </div>
        <div className="flex flex-col lg:flex-row justify-center items-center w-full lg:max-w-[60%] gap-x-8 mt-6 space-y-4 lg:space-y-0">
          <input
            type="email"
            placeholder="Enter your Email Address"
            className="p-3 bg-white text-black rounded-xl w-full"
          />
          <button className="bg-[var(--primary)] p-3 px-5 text-lg rounded-xl text-white">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
}
