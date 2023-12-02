"use client";
import React, { MouseEvent, useEffect, useRef, useState } from "react";
import TextWithImage from "./TextWithImage";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faStar as faSolidStar,
} from "@fortawesome/free-solid-svg-icons";
import { faStar } from "@fortawesome/free-regular-svg-icons";
import Image from "next/image";

const studentReviews = [
  {
    studentName: "Nadia",
    title: "Best Quality Online Course!",
    description:
      "TeachLine transformed my learning experience. The interactive lessons and dedicated mentors helped me excel.",
    studentPost: "Back-end Developer",
    imageName: "5.jpg",
    photoPath: "/teachline-images/student-images-for-review/",
  },
  {
    studentName: "Rajesh P",
    title: "Detailed learning materials",
    description:
      "I can't thank TeachLine enough for their affordable pricing and scholarships. Education is now within everyone's reach.",
    studentPost: "High school",
    imageName: "1.jpg",
    photoPath: "/teachline-images/student-images-for-review/",
  },
  {
    studentName: "Emily Dominac",
    title: "Great Quality!",
    description:
      "The mentorship network at TeachLine is outstanding. I've witnessed students flourish under their guidance.",
    studentPost: "Hotel Manager",
    imageName: "4.jpg",
    photoPath: "/teachline-images/student-images-for-review/",
  },
  {
    studentName: "Rishi",
    title: "Best Quality Online Course!",
    description:
      "TeachLine transformed my learning experience. The interactive lessons and dedicated mentors helped me excel.",
    studentPost: "Software Engineer",
    imageName: "2.jpg",
    photoPath: "/teachline-images/student-images-for-review/",
  },
  {
    studentName: "Jack",
    title: "Mentors are just magic",
    description:
      "TeachLine is a game-changer for educators. The professional development courses boosted my teaching skills significantly.",
    studentPost: "FullStack developer",
    imageName: "3.jpg",
    photoPath: "/teachline-images/student-images-for-review/",
  },
];

export default function StudentReviews() {
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

    function onMouseMove(e: MouseEvent<HTMLUListElement>) {
      if (carousal.current) {
        carousal.current.scrollLeft =
          startScrollLeft.current - (e.pageX - startX.current);
      }
    }

    function onMouseUp() {
      setIsDragging(false);
      if (carousal.current) {
        carousal.current.removeEventListener("mousemove", (e) =>
          onMouseMove(e)
        );
      }
    }

    carousal.current?.addEventListener("mousemove", (e) => onMouseMove(e));
    document.addEventListener("mouseup", onMouseUp);

    return () => {
      document.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging]);

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

  useEffect(() => {
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
  }, []);

  function handleSliderArrowBtn(btnSide: "left" | "right") {
    if (!carousal.current) return;
    if (btnSide === "left" && carousal.current && firstCard.current)
      carousal.current.scrollLeft -= firstCard.current.clientWidth;
    if (btnSide === "right" && carousal.current && firstCard.current)
      carousal.current.scrollLeft += firstCard.current.clientWidth;
  }

  return (
    <div className="bg-white py-5 px-10 max-w-6xl mx-auto flex lg:flex-row lg:justify-between lg:items-center">
      <div className="lg:w-1/2 relative">
        <div className="text-4xl p-5 leading-relaxed text-black">
          <span>See What our </span>
          <TextWithImage text="Students" size={10} />
          <span> Say About us</span>
        </div>

        <ul
          onMouseDown={dragStart}
          onScroll={handleInfiniteScroll}
          ref={carousal}
          className={`grid grid-flow-col auto-cols-[calc(100%-15px)] gap-5 w-[90vw] lg:max-w-xl overflow-hidden select-none ${
            isDragging ? "cursor-grab" : "cursor-default"
          } snap-x snap-mandatory scroll-smooth scroll mx-auto`}
          style={{ scrollbarWidth: "none" }}
        >
          {studentReviews.map((review, index) => {
            return (
              <li
                key={"studentReview_" + index}
                ref={index === 0 ? firstCard : null}
                className="rounded-2xl p-5 bg-white group transition-all duration-300 ease-in-out snap-start"
              >
                <div className="flex flex-col">
                  <div className="text-2xl text-black my-5">{review.title}</div>
                  <div className="text-gray-400">{review.description}</div>
                </div>

                <div className="flex items-center shadow-lg shadow-gray-100 p-2 rounded-xl w-fit">
                  <div className="bg-[#7974f4] w-10 h-10 m-2 text-white rounded-full flex justify-center items-center overflow-hidden">
                    <Image
                      src={review.photoPath + review.imageName}
                      width={120}
                      height={120}
                      alt={review.studentName}
                      className="text-white object-cover"
                    />
                  </div>
                  <div className="flex flex-col">
                    <div className="text-[#ffc0c0]">{review.studentName}</div>
                    <div className="text-gray-500 text-sm">
                      {review.studentPost}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="flex justify-end m-4 text-[var(--primary)] absolute right-5 bottom-5">
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

      <div className="hidden lg:block w-1/2">
        <Image width={400} height={400} alt="" src={"/teachline-images/home-testimonial.webp"} className="mx-auto" />
      </div>
    </div>
  );
}
