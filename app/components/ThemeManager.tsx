"use client";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { faCloudSun, faSunPlantWilt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

export default function ThemeManager() {
  const [theme, setTheme] = useState<string>("light");

  useEffect(() => {
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (prefersDark) {
      setTheme("dark");
    }

    const handleThemeChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setTheme("dark");
      } else {
        setTheme("light");
      }
    };

    const colorSchemeMediaQuery = window.matchMedia(
      "(prefers-color-scheme: dark)"
    );
    colorSchemeMediaQuery.addEventListener("change", handleThemeChange);

    return () => {
      colorSchemeMediaQuery.removeEventListener("change", handleThemeChange);
    };
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.theme = "dark";
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.theme = "light";
    }
  }, [theme]);

  return (
    <div
      className={`flex text-black dark:text-white p-2 w-7 h-7 justify-center items-center rounded-lg`}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" && (
        <FontAwesomeIcon icon={faSun}/>
      )}
      {theme === "light" && <FontAwesomeIcon icon={faMoon} />}
    </div>
  );
}
