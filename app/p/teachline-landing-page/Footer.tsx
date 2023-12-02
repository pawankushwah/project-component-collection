import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDribbble,
  faGithub,
  faInstagram,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import React from "react";

export default function Footer() {
  return (
    <div className="bg-[var(--primary)] text-white px-5 py-20 max-w-6xl mx-auto lg:flex">
      <div>
        <div className="text-3xl my-5">Teachline</div>
        <div className="my-3 text-sm tracking-wider">
          TeachLine is an online learning platform that has been operating since
          2018 until now.
        </div>
        <div className="my-4 mb-8 flex gap-x-4">
          <a href="#">
            <FontAwesomeIcon
              icon={faInstagram}
              className="p-2 w-7 h-7 rounded-full hover:bg-orange-300"
            />
          </a>
          <a href="#">
            <FontAwesomeIcon
              icon={faYoutube}
              className="p-2 w-7 h-7 rounded-full hover:bg-orange-300"
            />
          </a>
          <a href="#">
            <FontAwesomeIcon
              icon={faTwitter}
              className="p-2 w-7 h-7 rounded-full hover:bg-orange-300"
            />
          </a>
          <a href="#">
            <FontAwesomeIcon
              icon={faDribbble}
              className="p-2 w-7 h-7 rounded-full hover:bg-orange-300"
            />
          </a>
          <a href="#">
            <FontAwesomeIcon
              icon={faGithub}
              className="p-2 w-7 h-7 rounded-full hover:bg-orange-300"
            />
          </a>
        </div>
      </div>
      <div className="flex flex-col w-full gap-y-8 lg:flex-row">

        <div className="flex flex-col gap-y-2 max-w-2xl w-full">
          <h1 className="text-xl mb-4">Courses</h1>
          <div className="flex flex-col gap-y-2">
            <a className="underline-offset-2 hover:underline" href="#">
              UI/UX Design
            </a>
            <a className="underline-offset-2 hover:underline" href="#">
              Mobile Development
            </a>
            <a className="underline-offset-2 hover:underline" href="#">
              Machine Learning
            </a>
            <a className="underline-offset-2 hover:underline" href="#">
              Web Development
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-y-2 max-w-2xl w-full">
          <h1 className="text-xl mb-4">Menu</h1>
          <div className="flex flex-col gap-y-2">
            <a className="underline-offset-2 hover:underline" href="#">
              Home
            </a>
            <a className="underline-offset-2 hover:underline" href="#">
              Courses
            </a>
            <a className="underline-offset-2 hover:underline" href="#">
              Testinomials
            </a>
            <a className="underline-offset-2 hover:underline" href="#">
              Mentor
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-y-2 max-w-2xl w-full">
          <h1 className="text-xl mb-4">About</h1>
          <div className="flex flex-col gap-y-2">
            <a className="underline-offset-2 hover:underline" href="#">
              Contact Us
            </a>
            <a className="underline-offset-2 hover:underline" href="#">
              Privacy Policy
            </a>
            <a className="underline-offset-2 hover:underline" href="#">
              Term & Condition
            </a>
            <a className="underline-offset-2 hover:underline" href="#">
              FAQ
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
