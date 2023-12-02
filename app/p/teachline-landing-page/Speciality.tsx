"use client";
import {
  Box,
  CircularProgress,
  LinearProgress,
  linearProgressClasses,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import React from "react";
import TextWithImage from "./TextWithImage";

const benefits = [
  {
    imageName: "interactive-learning-modules.svg",
    benefit: "interactive learning modules",
    description:
      "Engage learners with dynamic lessons for an immersive educational experience.",
    imagePath: "/teachline-images/icon/",
  },
  {
    imageName: "Transparent-Fee-Structure.svg",
    benefit: "Transparent Fee Structure",
    description:
      "Ensure clarity by presenting affordable payment plans for learners.",
    imagePath: "/teachline-images/icon/",
  },
  {
    imageName: "Personalized-Tutoring-Services.svg",
    benefit: "Personalized Tutoring Services",
    description:
      "Provide one-on-one guidance and support to each student unique learning needs.",
    imagePath: "/teachline-images/icon/",
  },
  {
    imageName: "Experienced-Mentor-Network.svg",
    benefit: "Experienced Mentor Network",
    description:
      "Connect students with mentors who provide guidance & personalized support.",
    imagePath: "/teachline-images/icon/",
  },
];

interface BorderLinearProgressProps {
  colorCustom?: string; // Define the custom prop
}

const BorderLinearProgress = styled(LinearProgress)<BorderLinearProgressProps>(
  ({ theme, colorCustom }) => ({
    height: 6,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: colorCustom || "#f303ff",
    },
  })
);

interface CircularProgressBarProps {
  value: number; // Progress value (0 to 100)
  thickness?: number; // Thickness of the circular border
  size?: number; // Size of the circular progress bar
  customcolor?: string;
  padding?: number,
  style?: object
}

const CircularProgressBarWithLabel: React.FC<CircularProgressBarProps> = ({
  value,
  thickness,
  size,
  customcolor,
  padding,
  style
}) => {
  if (!size) size = 10;
  if (!thickness) thickness = 5;
  if (!value) value = 50;
  if (!padding) padding = 10;
  return (
    <div style={{ position: "relative", width: size + padding, height: size + padding, display: "flex", justifyContent: "center", alignItems: "center" }}>
      <CircularProgress
        variant="determinate"
        value={value}
        thickness={thickness}
        size={size}
        style={{
          color: customcolor || "#f303ff",
          ...style
        }}
      />
      <span
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          translate: "-50% -50%"
        }}
      >
        {Math.round(value)}%
      </span>
    </div>
  );
};

export default function Speciality() {
  return (
    <div className="p-5 py-20 lg:flex lg:flex-center max-w-6xl mx-auto">
      <div className="relative flex flex-col gap-y-8 lg:flex-[3]">
        <Image
          width={400}
          height={400}
          alt=""
          src="/teachline-images/home-feature.webp"
          className="w-full py-20"
        />

        <div className="p-5 absolute -top-8 right-0 bg-white w-52 space-y-5 shadow-lg rounded-lg lg:-right-10">
          <div className="text-xl text-black">Our Specialities</div>
          <div>
            <div className="text-sm">Methods</div>
            <BorderLinearProgress
              variant="determinate"
              value={100}
              colorCustom="#f303ff"
            />
          </div>

          <div>
            <div className="text-sm">Teaching Tricks</div>
            <BorderLinearProgress
              variant="determinate"
              value={90}
              colorCustom="#26e8bd"
            />
          </div>

          <div>
            <div className="text-sm">Shortcut</div>
            <BorderLinearProgress
              variant="determinate"
              value={5}
              colorCustom="#0063ff"
            />
          </div>
        </div>

        <div className="flex flex-col text-center w-36 absolute bg-white rounded-lg p-5 bottom-10 left-0 shadow-lg overflow-hidden">
          <div className="text-black">Selection Rate</div>
          <div className="text-sm">Last 5 years</div>
          <div className="mt-3 mx-auto">
            <CircularProgressBarWithLabel
              value={90}
              thickness={3}
              size={60}
              customcolor="#32dc88"
              padding={10}
              style={{
                rotate: "120deg"
              }}
            />
          </div>
        </div>
      </div>

      <div className="lg:pl-16 lg:flex-[4]">
        <h1 className="text-4xl leading-relaxed text-black lg:text-6xl lg:leading-relaxed">
          <span>Make your </span>
          <TextWithImage text="Learning" size={10} />
          <span>Enjoyable & Easy</span>
        </h1>

        <div className="my-5 lg:text-gray-600 lg:text-lg lg:p-2 lg:my-2">
          Set the way of learning according to your wishes with some of the
          benefits that you get us, so you on enjoy the lessons that we provide.
        </div>

        <div className="p-5 space-y-10 lg:grid lg:grid-cols-2 lg:p-0 lg:gap-2 lg:space-y-2">
          {benefits.map((e, index) => {
            return (
              <div
                key={"benefits_" + index}
                className="flex items-center shadow-lg shadow-gray-100 p-2 rounded-3xl"
              >
                <div className="bg-[#7974f4] w-10 h-10 p-2 m-2 text-white rounded-full flex justify-center items-center lg:mx-4 lg:w-20 lg:aspect-square lg:rounded-e-full">
                  <Image
                    src={e.imagePath + e.imageName}
                    width={100}
                    height={100}
                    alt={e.benefit}
                    className="text-white object-cover"
                  />
                </div>
                <div className="flex flex-col">
                  <div className="text-[#ffc0c0]">{e.benefit}</div>
                  <div className="text-gray-500 text-sm">{e.description}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
