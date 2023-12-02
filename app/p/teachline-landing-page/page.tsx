import React from "react";
import Navbar from "./Navbar";
import About from "./About";
import PopularCourses from "./PopularCourses";
import Speciality from "./Speciality";
import StudentReviews from "./StudentReviews";
import SubscribeUs from "./SubscribeUs";
import Footer from "./Footer";
import ExpertMentors from "./ExpertMentors";

export default function Home() {
  return (
    <div className="w-screen min-h-screen bg-white dark:bg-black">
      <div className="w-5 h-5 absolute top-0 left-0 bg-green-400 sm:bg-orange-400 md:bg-blue-400 lg:bg-red-400 xl:bg-black-400 2xl:bg-purple-400"></div>
      <Navbar />
      <About />
      <PopularCourses />
      <Speciality />
      <StudentReviews />
      <ExpertMentors />
      <SubscribeUs />
      <Footer />
    </div>
  );
}
