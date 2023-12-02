"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Loading from "../(components)/Loading";

export default function Index() {
  const [usersData, setUsersData] = useState({});
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  async function getUserData() {
    let response = await fetch("./api/pvt/getUserData", {
      method: "POST",
    });

    let data = await response.json();
    if(response.status !== 200) router.push('../login');
    if(response.status) setUsersData(data);
  }

  useEffect( () => {
    getUserData().then(() => setIsPageLoading(false));
  }, []);

  async function logoutTheUser() {
    setIsLoading(true);
    let response = await fetch("./api/pvt/logout", {
      method: "DELETE",
    });

    console.log("Hello World!");

    setIsLoading(false);
    if (response.status === 200) {
      router.push("/p/teachline-landing-page/login");
    }
  }

  return (
    <>
      {isPageLoading && <Loading /> }
      <div className="h-screen flex justify-center items-center text-black bg-white dark:text-white dark:bg-gray-800">
        <div className="p-5 bg-blue-300 border-2 border-black rounded-xl dark:bg-black dark:border-white">
          <div>Name: {usersData.firstName + " " + usersData.lastName}</div>
          <div>Email: {usersData.email}</div>
          <div>Mobile: {usersData.mobile && usersData.mobile}</div>
          <div>Username: {usersData.username}</div>
          <div>userId: {usersData._id}</div>

          <button
            className="bg-white dark:bg-gray-800 flex items-center rounded-lg p-2 mx-auto mt-5 "
            onClick={logoutTheUser}
          >
            Logout
            {isLoading && (
              <>
                <div className="flex items-center justify-center">
                  <div className="w-4 h-4 ml-4 border-4 border-blue-500 border-r-white rounded-full animate-spin"></div>
                </div>
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
