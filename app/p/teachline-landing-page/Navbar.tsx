"use client";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useState } from "react";
import Button, { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { Stack } from "@mui/material";
import Link from "next/link";

export default function Navbar() {
  const [showNavigationScreen, setShowNavigationScreen] = useState(false);

  const SignInBtn = styled(Button)<ButtonProps>(({ theme }) => ({
    color: "#7974f4",
    border: "2px solid #7974f4",
    backgroundColor: "white",
    borderRadius: "12px",
    padding: "6px 14px",
    cursor: "pointer",
  }));

  const LogInBtn = styled(Button)<ButtonProps>(({ theme }) => ({
    color: "white",
    backgroundColor: "#7974f4",
    borderRadius: "12px",
    padding: "8px 16px",
    cursor: "pointer",
  }));

  return (
    <div className="flex justify-between items-center p-5 max-w-6xl mx-auto">
      <span>
        <Image
          width={150}
          height={100}
          src={"/teachline-images/techline.png"}
          alt="Teachline logo"
          className="md:w-52"
        />
      </span>
      <span className="lg:hidden lg:w-1/3">
        <FontAwesomeIcon
          icon={faBars}
          className="w-5 h-5 text-gray-700 cursor-pointer hover:bg-gray-100 p-3 rounded-full"
          onClick={() => setShowNavigationScreen(true)}
        />
      </span>

      {/* mobile navigation screen */}
      <div
        className={`z-50 fixed left-0 ${
          showNavigationScreen ? "top-0" : "-top-[150%]"
        } overflow-hidden ease-in-out duration-300 lg:static lg:flex lg:w-2/3 lg:justify-center`}
      >
        <div className="w-screen h-screen flex justify-center items-center bg-white text-black lg:w-auto lg:h-auto">
          <span
            onClick={() => setShowNavigationScreen(false)}
            className="absolute top-3 right-3 hover:bg-gray-100 text-gray-600 p-3 aspect-square flex justify-center items-center cursor-pointer rounded-full text-2xl lg:hidden"
          >
            <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
          </span>
          <div className="flex flex-col gap-7 justify-center items-center text-xl text-gray-400 lg:flex-row">
            <a
              href="#"
              className="group flex flex-col justify-center items-center"
            >
              <span className="group-hover:text-purple-700">Home</span>
              <span className="invisible group-hover:visible rotate-3">
                <Image
                  width={40}
                  height={40}
                  src="/teachline-images/headline-curve.svg"
                  alt=""
                />
              </span>
            </a>
            <a
              href="#"
              className="group flex flex-col justify-center items-center"
            >
              <span className="group-hover:text-purple-700">Courses</span>
              <span className="invisible group-hover:visible rotate-3">
                <Image
                  width={40}
                  height={40}
                  src="/teachline-images/headline-curve.svg"
                  alt=""
                />
              </span>
            </a>
            <a
              href="#"
              className="group flex flex-col justify-center items-center"
            >
              <span className="group-hover:text-purple-700">Testinomial</span>
              <span className="invisible group-hover:visible rotate-3">
                <Image
                  width={40}
                  height={40}
                  src="/teachline-images/headline-curve.svg"
                  alt=""
                />
              </span>
            </a>
            <a
              href="#"
              className="group flex flex-col justify-center items-center"
            >
              <span className="group-hover:text-purple-700">Mentor</span>
              <span className="invisible group-hover:visible rotate-3">
                <Image
                  width={40}
                  height={40}
                  src="/teachline-images/headline-curve.svg"
                  alt=""
                />
              </span>
            </a>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full p-10 flex justify-center items-center lg:static lg:p-2">
          <Stack spacing={2} direction="row">
            <Link href="./teachline-landing-page/signup">
              <SignInBtn>Sign In</SignInBtn>
            </Link>
            <Link href="/p/teachline-landing-page/login">
              <button className="bg-[#7974f4] text-white rounded-lg px-4 w-full h-full">
                Sign up
              </button>
            </Link>
          </Stack>
        </div>
      </div>
    </div>
  );
}
