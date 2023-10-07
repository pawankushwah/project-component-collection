"use client";
import { useEffect, useState } from "react";

export default function ThemeManager() {
      const [theme, setTheme] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" : "light");

      useEffect(() => {
            if(theme === 'dark'){
                  document.documentElement.classList.add("dark");
                  localStorage.theme = "dark";
            } 
            else if(theme === 'light') {
                  document.documentElement.classList.remove("dark");
                  localStorage.theme = "light";
            }
            else{
                  window.matchMedia('(prefers-color-scheme: dark)').matches ? setTheme("dark") : setTheme("light");
            }
      }, [theme]);
      

	return (
		<div className="flex gap-5 absolute top-5 right-5">
			<button onClick={() => setTheme('dark')} className="p-2 bg-black text-white">D</button>
			<button onClick={() => setTheme('light')} className="p-2 bg-white text-black">L</button>
			<button onClick={() => setTheme('')} className="p-2 bg-gray-400 text-black">N</button>
		</div>
	);
}
