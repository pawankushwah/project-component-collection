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

const mentors = [
  {
    mentorName: "John Dwirian",
    subject: "Science Teacher",
    experience: "10",
    mentorPhotoName: "photo_1.jpg",
    photoPath: "/teachline-images/mentors/",
    companyImg: "google.png",
    companyImgPath: "/teachline-images/company-logo/",
  },
  {
    mentorName: "Leon S Kennedy",
    subject: "Machine Learning",
    experience: "10",
    mentorPhotoName: "photo_2.webp",
    photoPath: "/teachline-images/mentors/",
    companyImg: "airbnb.png",
    companyImgPath: "/teachline-images/company-logo/",
  },
  {
    mentorName: "Murphy Mars",
    subject: "HTML expert",
    experience: "6",
    mentorPhotoName: "photo_3.webp",
    photoPath: "/teachline-images/mentors/",
    companyImg: "grab.png",
    companyImgPath: "/teachline-images/company-logo/",
  },
  {
    mentorName: "Stan Lee",
    subject: "Android Expert",
    experience: "6",
    mentorPhotoName: "photo_4.webp",
    photoPath: "/teachline-images/mentors/",
    companyImg: "microsoft.png",
    companyImgPath: "/teachline-images/company-logo/",
  },
];

export default function PopularCourses() {
  const [isDragging, setIsDragging] = useState(false);
  const carousal = useRef<HTMLUListElement | null>(null);
  const startX = useRef(0);
  const startScrollLeft = useRef(0);
  const firstCard = useRef<HTMLLIElement | null>(null);

  function dragStart(e: MouseEvent<HTMLUListElement>) {
    startX.current = e.pageX;
    if (carousal.current) startScrollLeft.current = carousal.current.scrollLeft;
    setIsDragging(true);
  }

  useEffect(() => {
    if (!isDragging) return;
    if (!carousal.current) return;

    function onMouseMove(e: MouseEvent<HTMLUListElement>) {
      if (carousal.current) {
        carousal.current.scrollLeft =
          startScrollLeft.current - (e.pageX - startX.current);
      }
      console.log("hello");      
    }

    function onMouseUp() {
      setIsDragging(false);
      if (carousal.current) {
        carousal.current.removeEventListener("mousemove", onMouseMove);
        // carousal.current.classList.remove("cursor-grab");
      }
    }

    carousal.current.addEventListener("mousemove", onMouseMove);
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

  // handling the dots of the carousal
  const [activeDotColors, setActiveDotColors] = useState<string[]>([
    "bg-[var(--primary)]",
  ]); // State to track dot colors
  const coursesLength = mentors.length;

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
      if (carousal.current) carousal.current.removeEventListener("scroll", updateDotColors);
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
    if (loadedImageCount === mentors.length) {
      handleAllImagesLoaded();
    }
  }, [loadedImageCount]);

  // Function to be called when an image is loaded
  const handleImageLoad = () => {
    setLoadedImageCount((prevCount) => prevCount + 1);
  };

  return (
    <div className="text-black bg-[var(--shadow)] max-w-6xl mx-auto px-10">
      <div className="flex flex-col md:flex-row lg:flex-col">
        <div className="text-4xl text-bold md:text-left md:mt-20 md:w-80 md:leading-[1.5] md:text-5xl md:p-5 md:mr-5 lg:w-full">
          Our Expert Mentors
        </div>

        <div className="overflow-hidden my-8 flex flex-col gap-y-2">
          <ul
            onMouseDown={dragStart}
            onScroll={handleInfiniteScroll}
            ref={carousal}
            className={`grid grid-flow-col md:w-96 lg:auto-cols-[calc(100%/3-15px)] auto-cols-[calc(100%-15px)] gap-5 w-full lg:w-full overflow-hidden select-none ${
              isDragging ? "cursor-grab" : "cursor-default"
            } snap-x snap-mandatory scroll-smooth scroll
            `}
            style={{ scrollbarWidth: "none" }}
          >
            {mentors.map((mentor, index) => {
              return (
                <li
                  key={"mentors_" + index}
                  ref={index === 0 ? firstCard : null}
                  className="rounded-2xl p-5 bg-white shadow-md hover:shadow-lg group transition-all duration-300 ease-in-out snap-start"
                >
                  <div className="bg-white rounded-xl">
                    <div className="w-full h-60 rounded-2xl overflow-hidden">
                      <Image
                        width={400}
                        height={400}
                        alt={mentor.mentorName}
                        src={mentor.photoPath + mentor.mentorPhotoName}
                        className="object-cover rounded-2xl w-full"
                      />
                    </div>
                    <div className="text-2xl mt-5">{mentor.mentorName}</div>
                    <div className="text-gray-600">{mentor.subject}</div>
                    <div className="text-gray-600 my-4 text-sm">{`${mentor.mentorName} have a ${mentor.experience} years of experience`}</div>
                    <Image
                      width={100}
                      height={100}
                      src={mentor.companyImgPath + mentor.companyImg}
                      alt={mentor.companyImg.replace(".png", "")}
                    ></Image>
                  </div>
                </li>
              );
            })}
          </ul>

          <div className="mt-8 flex justify-between gap-5 text-[var(--primary)]">
            <span className="flex gap-3 items-center">
              {generateNavigationDots(mentors.length)}
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
