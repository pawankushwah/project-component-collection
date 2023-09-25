"use client";
import ImageSlider from "./imageSlider";
import { useEffect, useState } from "react";
import Link from "next/link";
import projectsData from "./projectsData.json";
import componentsData from "./componentsData.json";

const projects = projectsData.filter((project) => {
  return !project.private;
});

const components = componentsData.filter((components) => {
  return !components.private;
});

type projectsType = {
  type: String;
  projectId: Number;
  title: String;
  description: String;
  createdOn: String;
  finishedOn: String;
  href: String;
  githubLink: String;
  screenshots: String[];
  private: boolean;
  screenshotPath: String;
};

type componentType = {
  type: String;
  componentId: Number;
  title: String;
  description: String;
  createdOn: String;
  finishedOn: String;
  href: String;
  githubLink: String;
  screenshots: String[];
  private:boolean;
  screenshotPath: String;
};

export default function Home() {
  // using a state so that we can change the array from where we will filter out the data
  // It is default to the projects
  const [dataToSearchFrom, setDataToSearchFrom] = useState<(projectsType | componentType)[]>(projects);
  const [itemNotFound, setItemNotFound] = useState(false);

  // It is being used for displaying the data in the form of cards when we search.
  const [cardJSX, setCardJSX] = useState(displayFilteredData(dataToSearchFrom));

  // useState for managing the selection of projects or components
  function handleSearchTypeChange(e: React.ChangeEvent<HTMLSelectElement>): void {
    console.log("changing type of Search", e.target.value);
    e.target.value === "components" ? setDataToSearchFrom(components) : setDataToSearchFrom(projects);
  }

  useEffect(() => {
    // when we change the searchType than dataToSearchFrom changes now we will change the card according to the current data
    setCardJSX(displayFilteredData(dataToSearchFrom));
  }, [dataToSearchFrom]);

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>): void {
    // Filter the object with the help of regex
    const filteredArray = dataToSearchFrom.filter((data) => {
      const regex = new RegExp(e.target.value, "gi");
      return (
        data.title.match(regex) ||
        data.description.match(regex) ||
        data.createdOn.toString().match(regex) ||
        data.finishedOn?.toString().match(regex)
      );
    });

    // display the output
    console.log(filteredArray);
    setCardJSX(displayFilteredData(filteredArray));
  }

  function displayFilteredData(filteredArray: (projectsType | componentType)[] ) {
    {
      return filteredArray.map((e) => {
        const keyNo = 'projectId' in e ? e.projectId : e.componentId;
        return (
          <div
            key={keyNo.toString()}
            className="projectCard flex flex-col items-center text-center border-2 border-white rounded-lg overflow-hidden m-5 max-w-sm h-fit"
          >
            <ImageSlider images={e.screenshots} imagePath={e.screenshotPath} />
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
      <div className="flex flex-col gap-y-4 md:flex-row md:gap-0 justify-center align-center p-5 pt-10">
        <select id="searchType" className="rounded-lg md:rounded-r-none p-2 px-5 text-xl bg-slate-600" onChange={handleSearchTypeChange}>
          <option value="projects">Projects</option>
          <option value="components">Components</option>
        </select>
        <input
          type="search"
          onChange={handleSearch}
          id="searchBar"
          className="bg-gray-700 rounded-lg md:rounded-l-none text-white p-2 px-5 w-full text-xl md:w-[40%]"
          placeholder="Search Projects..."
        />
      </div>
      <div
        id="projectCards"
        className="min-h-screen pb-10 flex justify-center flex-wrap"
      >
        {cardJSX}
        {
          itemNotFound && (
            <>
              Not 
            </>
          )
        }
      </div>
    </>
  );
}
