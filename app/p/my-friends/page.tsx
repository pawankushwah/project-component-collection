"use client";

import Image from "next/image";

const friendsData = [
  {
    name: "Sagar",
    age: "19",
    description: "हिलाने की तैयारी",
    image: "sagar.jpg",
  },
  {
    name: "Nishant",
    age: "19",
    description: "हिला हिला के हिला हुआ बंदा",
    image: "nishant.png",
  },
  {
    name: "Devendra",
    age: "19",
    description: "हिला हिला के परेशान हुआ बंदा",
    image: "devendra.jpg",
  },
  {
    name: "Tanish",
    age: "20",
    description: "एक चमकता हुआ लोनडा",
    image: "tanish.png",
  },
  {
    name: "Rohit",
    age: "19",
    description: "एक चमकता हुआ लोनडा",
    image: "rohit.jpg",
  },
  {
    name: "Anshul",
    age: "19",
    description: "हिलाता हुआ लोंडा",
    image: "anshul.png",
  },
];

export default function MyFriend() {
  return (
    <div className="flex flex-col p-10 items-center w-screen bg-black">
      <div className="text-center text-4xl">मेरे दोस्त</div>
      <hr className="w-24 mb-5" />
      <div className="flex flex-wrap justify-center items-center gap-5">
        {friendsData.map((e, index) => {
          return (
            <div
              className="flex flex-col max-w-96 rounded-lg text-center border-2 bg-black hover:bg-gray-800 overflow-hidden"
              key={index}
            >
              <Image
                src={`/friends_images/${e.image}`}
                alt={e.name}
                width={200}
                height={200}
                className="rounded-full w-96 aspect-square p-5"
              />
              <div className="flex flex-col text-3xl p-5 space-y-5">
                <div>{e.name}</div>
                <div>{e.description}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
