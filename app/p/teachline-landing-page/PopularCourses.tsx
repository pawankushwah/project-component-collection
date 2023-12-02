"use client";

import { faStar } from "@fortawesome/free-regular-svg-icons";
import {
  faArrowLeft,
  faArrowRight,
  faStar as faSolidStar,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { MouseEvent, useEffect, useRef, useState } from "react";

const coursesImagesPath = "/teachline-images/slides/popular-courses/";

type courseDataProps = {
  id: string,
  title: string,
  rating: number,
  numberOfRating: number,
  price: number,
  currency: string,
  imageName: string
}

export default function PopularCourses() {
  const [isDragging, setIsDragging] = useState(false);
  const carousal = useRef<HTMLUListElement | null>(null);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);
  const firstCard = useRef<HTMLLIElement | null>(null);
  const [courseData, setCourseData] = useState<courseDataProps[]>([]);

  function dragStart(e: MouseEvent<HTMLUListElement>) {
    startX.current = e.pageX;
    if (carousal.current) startScrollLeft.current = carousal.current.scrollLeft;
    setIsDragging(true);
  }

  // fetching data from the database
  async function getPopularCourses(){
    let coursesData = await fetch("./teachline-landing-page/api/getPopularCourses");
    let coursesDataJSON = coursesData = await coursesData.json();
    console.log(coursesDataJSON);
    setCourseData(coursesDataJSON);
  }

  useEffect(() => {
    getPopularCourses();
  }, []);

  useEffect(() => {
    if (!isDragging) return;

    function onMouseMove(e: MouseEvent<HTMLUListElement>) {
      if (carousal.current) {
        carousal.current.scrollLeft =
          startScrollLeft.current - (e.pageX - startX.current);
      }
    }

    function onMouseUp() {
      setIsDragging(false);
      if (carousal.current) {
        carousal.current.removeEventListener("mousemove", onMouseMove);
      }
    }

    carousal.current?.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging]);

  function handleSliderArrowBtn(btnSide: "left" | "right") {
    if (!carousal.current) return;
    if (btnSide === "left" && carousal.current && firstCard.current)
      carousal.current.scrollLeft -= firstCard.current.clientWidth;
    if (btnSide === "right" && carousal.current && firstCard.current)
      carousal.current.scrollLeft += firstCard.current.clientWidth;
  }

  function formatPrice(currencyType: string, price: number) {
    let formatter = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currencyType,
      maximumFractionDigits: 0,
    });
    return formatter.format(price);
  }

  function generateStarForRating(noOfStar: number, courseName: string) {
    let stars = [];
    for (let i = 0; i < 5; i++) {
      if (i < noOfStar) stars.push(<FontAwesomeIcon icon={faSolidStar} />);
      else {
        let newCourseName = courseName.replaceAll(" ", "");
        stars.push(
          <FontAwesomeIcon
            icon={faStar}
            key={"stars_" + newCourseName + i}
            className="text-gray-500"
          />
        );
      }
    }
    return <>{stars}</>;
  }

  // handling the dots of the carousal
  const [activeDotColors, setActiveDotColors] = useState<string[]>([
    "bg-[var(--primary)]",
  ]); // State to track dot colors
  const coursesLength = courseData.length;

  useEffect(() => {
    // Function to update dot colors based on scroll position
    const updateDotColors = () => {
      if (!firstCard.current) return;
      if (!carousal.current) return;

      const cardPerView =
        carousal.current.offsetWidth / firstCard.current.clientWidth;
      const totalCard = coursesLength;
      const dotColors: string[] = [];
      for (let i = 0; i < totalCard; i++) {
        const isActive =
          carousal.current.scrollLeft >=
            (i + cardPerView) * firstCard.current.clientWidth &&
          carousal.current.scrollLeft <
            (i + 1 + cardPerView) * firstCard.current.clientWidth;
        dotColors.push(isActive ? "bg-[var(--primary)]" : "bg-gray-300");
      }

      // Check if the user has reached the beginning or the end
      if (carousal.current.scrollLeft === 0) {
        dotColors[0] = "bg-[var(--primary)]"; // First dot becomes primary color
      } else if (
        Math.ceil(carousal.current.scrollLeft) ===
        carousal.current.scrollWidth - carousal.current.offsetWidth
      ) {
        dotColors[dotColors.length - 1] = "bg-[var(--primary)]"; // Last dot becomes primary color
      }

      setActiveDotColors(dotColors);
    };

    // Attach scroll event listener to the carousel
    if (carousal.current) {
      carousal.current.addEventListener("scroll", updateDotColors);
    }

    // Initial update of dot colors
    updateDotColors();

    // Clean up the event listener when the component unmounts
    return () => {
      if (carousal.current) {
        carousal.current.removeEventListener("scroll", updateDotColors);
      }
    };
  }, [coursesLength]);

  function generateNavigationDots(length: number) {
    return Array.from({ length }, (_, i) => (
      <span
        key={`navigation_dot_course${i}`}
        className={`max-w-8 w-8 h-2 rounded-lg ${activeDotColors[i]}`}
      ></span>
    ));
  }

  function handleInfiniteScroll() {
    if (!carousal.current) return;
    if (!firstCard.current) return;

    if (carousal.current.scrollLeft === 0) {
      carousal.current.classList.remove("smooth-scroll");
      carousal.current.scrollLeft =
        carousal.current.scrollWidth - 2 * carousal.current.offsetWidth;
      carousal.current.classList.add("smooth-scroll");
    } else if (
      Math.ceil(carousal.current.scrollLeft) ===
      carousal.current.scrollWidth - carousal.current.offsetWidth
    ) {
      carousal.current.classList.remove("smooth-scroll");
      carousal.current.scrollLeft = carousal.current.offsetWidth;
      carousal.current.classList.add("smooth-scroll");
    }
  }

  // handling the images loading
  const [loadedImageCount, setLoadedImageCount] = useState(0);

  // Function to be executed after all images are loaded
  const handleAllImagesLoaded = () => {
    let cardPerView = 0;
    let carousalChildren;
    if (carousal.current && firstCard.current)
      cardPerView =
        carousal.current?.offsetWidth / firstCard.current?.clientWidth;
    if (carousal.current)
      carousalChildren = Array.from(carousal.current.children);

    carousalChildren &&
      carousalChildren
        .slice(-cardPerView)
        .reverse()
        .forEach((card) => {
          carousal.current?.insertAdjacentHTML("afterbegin", card.outerHTML);
        });

    carousalChildren &&
      carousalChildren.slice(0, cardPerView).forEach((card) => {
        carousal.current?.insertAdjacentHTML("beforeend", card.outerHTML);
      });
  };

  useEffect(() => {
    if (loadedImageCount === courseData.length) {
      handleAllImagesLoaded();
    }
  }, [loadedImageCount]);

  // Function to be called when an image is loaded
  const handleImageLoad = () => {
    setLoadedImageCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="text-black bg-[var(--shadow)] py-12 px-5 flex flex-col md:flex-row max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row">
        <div className="text-3xl text-center md:text-left md:mt-20 md:leading-[1.5] md:text-5xl md:p-5 md:mr-5 md:w-min">
          Most Popular Courses
        </div>

        <div className="overflow-hidden my-8 flex flex-col gap-y-2">
          <ul
            onMouseDown={dragStart}
            onScroll={handleInfiniteScroll}
            ref={carousal}
            className={`grid grid-flow-col w-full auto-cols-[calc(100%-15px)] md:auto-cols-[calc(100%/2-15px)] lg:auto-cols-[calc(100%/3-15px)] sm:w-full md:max-w-xl lg:max-w-3xl gap-5 overflow-hidden select-none ${
              isDragging ? "cursor-grab" : "cursor-default"
            } snap-x snap-mandatory scroll-smooth mx-auto`}
            style={{ scrollbarWidth: "none" }}
          >
            { courseData && courseData.map((course, index) => {
              return (
                <li
                  key={course.id}
                  ref={index === 0 ? firstCard : null}
                  className="snap-start rounded-2xl p-5 bg-white shadow-md hover:shadow-lg group transition-all duration-300 ease-in-out"
                >
                  <div className="w-full">
                    <Image
                      className="rounded-2xl object-cover w-full"
                      width={300}
                      height={300}
                      src={`${coursesImagesPath}${course.imageName}`}
                      alt={course.title}
                      draggable={false}
                      loading="eager"
                      onLoad={handleImageLoad}
                    />
                  </div>
                  <h2 className="text-xl py-2 my-2">{course.title}</h2>
                  <div className="text-yellow-400 space-x-2 text-lg my-4">
                    {generateStarForRating(course.rating, course.imageName)}
                    <span className="text-black font-bold">
                      ({course.numberOfRating})
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-[var(--primary)] text-xl">
                    <span>
                      <span>{formatPrice(course.currency, course.price)}</span>
                      <span className="text-black">/ course</span>
                    </span>
                    <span>
                      <FontAwesomeIcon
                        icon={faArrowRight}
                        className="bg-white p-3 rounded-full shadow-[0_10px_10px_0_rgb(0_0_0_/_3%)] cursor-pointer group-hover:text-white group-hover:bg-[var(--primary)] "
                      />
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 flex justify-between gap-5 text-[var(--primary)]">
            <span className="flex gap-3 items-center">
              {generateNavigationDots(courseData.length)}
            </span>
          </div>

          <div className="flex justify-end m-4 text-[var(--primary)]">
            <span className="space-x-5">
              <FontAwesomeIcon
                icon={faArrowLeft}
                onClick={() => handleSliderArrowBtn("left")}
                className="bg-white p-3 rounded-full shadow-[0_10px_10px_0_rgb(0_0_0_/_3%)] cursor-pointer hover:text-white hover:bg-[var(--primary)] "
              />
              <FontAwesomeIcon
                icon={faArrowRight}
                onClick={() => handleSliderArrowBtn("right")}
                className="bg-white p-3 rounded-full shadow-[0_10px_10px_0_rgb(0_0_0_/_3%)] cursor-pointer hover:text-white hover:bg-[var(--primary)] "
              />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
