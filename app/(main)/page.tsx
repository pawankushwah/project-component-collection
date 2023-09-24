"use client";
import ImageSlider from "./imageSlider";
import { useState } from "react";
import Link from "next/link";
import data from "./data.json"

const projects = data.filter((project) => {
  return !project.private;
})

type projectsType = {
  projectId: Number;
  title: String;
  description: String;
  createdOn: Date;
  finishedOn: Date;
  href: String;
  githubLink: String;
  screenshots: String[];
  // comments: [
  //   {
  //     userId: 1,
  //     userName: 'Pawan Kushwah',
  //     message: "You portfolio is Awesome"
  //   }
  // ],
  // githubDetails:
};

export default function Home() {
  const [cardJSX, setCardJSX] = useState(displayFilteredData(projects));

  function handleSearch(e: any) {
    // Filter the object with the help of regex
    const filteredArray = projects.filter((project) => {
      const regex = new RegExp(e.target.value, "gi");
      return (
        project.title.match(regex) ||
        project.description.match(regex) ||
        project.createdOn.toString().match(regex) ||
        project.finishedOn?.toString().match(regex)
      );
    });

    // display the output
    console.log(filteredArray);
    setCardJSX(displayFilteredData(filteredArray));
  }

  function displayFilteredData(filteredArray: projectsType[]) {
    {
      return filteredArray.map((e) => {
        return (
          <div
            key={`${e.projectId}`}
            className="projectCard flex flex-col items-center text-center border-2 border-white rounded-lg overflow-hidden m-5 max-w-sm h-fit"
          >
            <ImageSlider images={e.screenshots} />
            <Link
              href={`${e.href}`}
              className="p-5 text-xl md:text-2xl font-bold hover:text-blue-500"
            >
              {e.title}
            </Link>
            <hr className="bg-white w-20" />
            <div className="p-5 text-md md:text-xl">{e.description}</div>
          </div>
        );
      });
    }
  }

  return (
    <>
      <div className="w-5 h-5 absolute top-0 left-0 bg-green-400 sm:bg-orange-400 md:bg-blue-400 lg:bg-red-400 xl:bg-black-400 2xl:bg-purple-400"></div>
      <div className="flex justify-center align-center p-5 h-20">
        <input
          type="search"
          onChange={handleSearch}
          id="searchBar"
          className="bg-gray-700 rounded-lg text-white p-2 w-full text-xl md:w-[80%]"
          placeholder="Search Projects..."
        />
      </div>
      <div
        id="projectCards"
        className="min-h-screen pb-10 flex justify-center flex-wrap"
      >
        {cardJSX}
      </div>
    </>
  );
}
